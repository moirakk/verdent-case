#!/usr/bin/env bash
set -euo pipefail

episode_file="${1:-}"
note="${2:-update episode}"

if [ -z "$episode_file" ]; then
  echo "Usage: scripts/save-episode-version.sh series/skillbook/episodes/ep-001-plan-mode.html \"short note\""
  exit 1
fi

if [ ! -f "$episode_file" ]; then
  echo "Episode file not found: $episode_file"
  exit 1
fi

base="$(basename "$episode_file" .html)"
stamp="$(date +%Y%m%d-%H%M)"
episode_dir="$(dirname "$episode_file")"
series_dir="$(dirname "$episode_dir")"
version_dir="$series_dir/versions/$base"
version_file="$version_dir/$base-v$stamp.html"

mkdir -p "$version_dir"
cp "$episode_file" "$version_file"

git add "$episode_file" "$version_file"
git commit -m "video($base): $note"

echo "Saved $version_file"
