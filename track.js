#!/usr/bin/env node
/**
 * track.js — git-based coding time tracker
 * Creates real git commits as timestamped proof of coding sessions.
 *
 * Usage (run from inside your project folder):
 *   node track.js start          → starts a session, makes a git commit
 *   node track.js stop           → ends session, commits with duration
 *   node track.js log            → pretty-prints all your sessions
 *   node track.js log --json     → outputs raw JSON (for sharing/exporting)
 *
 * Requirements: git must be installed and the folder must be a git repo.
 * The file ".codetime" is added to your repo to store session state.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const STATE_FILE = path.join(process.cwd(), ".codetime");

function git(cmd, opts = {}) {
  return execSync(`git ${cmd}`, {
    cwd: process.cwd(),
    stdio: opts.silent ? "pipe" : "inherit",
    encoding: "utf8",
  });
}

function gitSilent(cmd) {
  try {
    return git(cmd, { silent: true }).trim();
  } catch {
    return null;
  }
}

function readState() {
  if (!fs.existsSync(STATE_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return null;
  }
}

function writeState(obj) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(obj, null, 2));
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatFull(isoString) {
  const d = new Date(isoString);
  return `${d.toLocaleDateString()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function ensureGitRepo() {
  const result = gitSilent("rev-parse --is-inside-work-tree");
  if (result !== "true") {
    console.error("Error: not inside a git repository. Run `git init` first.");
    process.exit(1);
  }
}

function getGitUser() {
  const name = gitSilent("config user.name") || "coder";
  return name;
}

// ─── Commands ────────────────────────────────────────────────────────────────

function cmdStart() {
  ensureGitRepo();
  const existing = readState();
  if (existing && existing.active) {
    const ago = formatDuration(Math.floor((Date.now() - new Date(existing.startedAt)) / 1000));
    console.log(`⚠️  Session already running (started ${ago} ago).`);
    console.log(`   Run: node track.js stop`);
    process.exit(1);
  }

  const now = new Date().toISOString();
  const state = {
    active: true,
    startedAt: now,
    sessions: (existing && existing.sessions) || [],
  };

  writeState(state);

  git("add .codetime");
  git(`commit -m "⏱️ [codetime] session started — ${formatFull(now)}"`);

  console.log(`\n✅ Session started at ${formatFull(now)}`);
  console.log(`   When you're done: node track.js stop\n`);
}

function cmdStop() {
  ensureGitRepo();
  const state = readState();
  if (!state || !state.active) {
    console.error("No active session. Run: node track.js start");
    process.exit(1);
  }

  const endTime = new Date();
  const startTime = new Date(state.startedAt);
  const durationSeconds = Math.floor((endTime - startTime) / 1000);

  if (durationSeconds < 10) {
    console.error("Session too short (< 10s). Did you accidentally run start twice?");
    process.exit(1);
  }

  const session = {
    startedAt: state.startedAt,
    endedAt: endTime.toISOString(),
    durationSeconds,
  };

  const updatedState = {
    active: false,
    sessions: [...state.sessions, session],
  };

  writeState(updatedState);

  const dur = formatDuration(durationSeconds);
  git("add .codetime");
  git(
    `commit -m "⏱️ [codetime] session ended — ${dur} coded — ${formatFull(state.startedAt)} → ${formatFull(endTime.toISOString())}"`
  );

  console.log(`\n✅ Session saved!`);
  console.log(`   Started : ${formatFull(state.startedAt)}`);
  console.log(`   Ended   : ${formatFull(endTime.toISOString())}`);
  console.log(`   Duration: ${dur}`);

  const total = updatedState.sessions.reduce((s, x) => s + x.durationSeconds, 0);
  console.log(`\n   Total time on this project: ${formatDuration(total)}\n`);
}

function cmdLog(args) {
  const state = readState();
  const sessions = (state && state.sessions) || [];
  const active = state && state.active;

  if (args.includes("--json")) {
    console.log(JSON.stringify({ sessions, active, activeStartedAt: state && state.startedAt }, null, 2));
    return;
  }

  if (sessions.length === 0 && !active) {
    console.log("\nNo sessions recorded yet. Run: node track.js start\n");
    return;
  }

  const total = sessions.reduce((s, x) => s + x.durationSeconds, 0);
  const user = getGitUser();

  console.log(`\n─────────────────────────────────────────`);
  console.log(`  Coding log for: ${user}`);
  console.log(`─────────────────────────────────────────\n`);

  // Group by day
  const byDay = {};
  for (const s of sessions) {
    const day = new Date(s.startedAt).toLocaleDateString(undefined, {
      weekday: "short", month: "short", day: "numeric", year: "numeric"
    });
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(s);
  }

  for (const [day, daySessions] of Object.entries(byDay)) {
    const dayTotal = daySessions.reduce((s, x) => s + x.durationSeconds, 0);
    console.log(`  📅 ${day}  (${formatDuration(dayTotal)} total)`);
    for (const s of daySessions) {
      const start = new Date(s.startedAt);
      const end = new Date(s.endedAt);
      const startStr = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
      const endStr = `${pad(end.getHours())}:${pad(end.getMinutes())}`;
      console.log(`     ${startStr} → ${endStr}   ${formatDuration(s.durationSeconds)}`);
    }
    console.log();
  }

  if (active && state.startedAt) {
    const runningFor = Math.floor((Date.now() - new Date(state.startedAt)) / 1000);
    console.log(`  🟢 Session in progress: ${formatDuration(runningFor)} so far\n`);
  }

  console.log(`─────────────────────────────────────────`);
  console.log(`  Total time: ${formatDuration(total + (active ? Math.floor((Date.now() - new Date(state.startedAt)) / 1000) : 0))}`);
  console.log(`  Sessions  : ${sessions.length}${active ? " + 1 active" : ""}`);
  console.log(`─────────────────────────────────────────\n`);

  console.log(`  💡 To show your gf, run:  git log --oneline --grep="codetime"\n`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const [, , command, ...rest] = process.argv;

const commands = { start: cmdStart, stop: cmdStop, log: cmdLog };

if (!commands[command]) {
  console.log(`
  track.js — git-based code time tracker

  Commands:
    node track.js start       start a coding session
    node track.js stop        end the session and save it
    node track.js log         view all sessions
    node track.js log --json  export as JSON
  `);
  process.exit(0);
}

commands[command](rest);
