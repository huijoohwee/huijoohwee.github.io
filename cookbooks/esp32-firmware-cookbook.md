---
title: "ESP32 firmware development"
doc_type: "Cookbook"
version: "1.0.0"
date: "2026-09-13"
lang: "en-US"
owner: "Firmware workflow maintainer"
load_policy: "on-demand"
---

# Reference implementation — ESP32 firmware development

Use a standalone native ESP-IDF application. Codex can edit source, run local tools,
and interpret their results; an IDE is optional. The computer connected to the board
owns compilation, flashing and monitoring. This cookbook adds navigation, not a new
execution platform. The firmware project owns configuration, tests and evidence.

## Choose the smallest interface

| Need | Reuse |
|---|---|
| Build and repeat from a terminal or agent | Pinned ESP-IDF, `idf.py`, native component management and local logs. |
| Existing CLion workflow | [Native integration](https://www.jetbrains.com/help/clion/esp-idf.html), shared environment/configuration, current version's debug profiles. Optional existing entitlement; no purchase required by this workflow. |
| An integrated setup/monitor/debug UI | [Official VS Code extension](https://docs.espressif.com/projects/vscode-esp-idf-extension/en/latest/), using the same SDK as the shell. |
| Accurate source navigation | Selected build's `compile_commands.json` and target-aware language tools. |
| Broader framework packaging | Evaluate PlatformIO only when needed; verify its pinned platform/SDK mapping first. |
| Hardware-independent logic/boot check | QEMU only for a supported target/peripheral set; retain separate physical tests. |

The historical `paoloach/ESP32` plugin inspires concise setup, action presets and a
serial console; its inspected build targets CLion 2020.3. Use current native tools
instead of porting that plugin or copying its SDK paths/parser.

## First board loop

1. Identify board/chip revision, flash size, USB interface, pinout and one observable
   behavior. Without hardware details, keep GPIO disabled and label results build-only.
2. Activate the pinned SDK environment. Check Python, CMake, Ninja, `idf.py` and the
   target compiler. Reuse an official example/BSP and retain component locks.
3. Build with an explicit target/configuration/build directory. Keep incremental
   outputs; do not run `set-target` on every edit. Capture binary, ELF and map identity.
4. Flash only the selected board with the matching artifact. Release any owned
   monitor first. Observe boot identity and the specified physical behavior separately.
5. Retain local bounded logs and input/artifact hashes. Repeat from another checkout;
   measure actual setup actions and elapsed time before claiming a speed improvement.

The reusable [ESP-IDF skill](https://github.com/huijoohwee/agentic-os/blob/9fd9da9d6b2dfc8997b77ea2e9ffc58560d15d44/skills/esp-idf/SKILL.md)
owns detailed agent instructions and optional editor/debug references. The link pins
the exact source revision so consumers can review and install the same instructions.

`agentic-os` distributes the on-demand instructions; this website routes to them.
Keep Canvas and Graph integrations deferred until existing tools leave a measured
gap. Commerce, `81rv10` and GameXR do not own the firmware development loop.

## Evidence boundary

A successful build is compilation evidence. Serial heartbeats are software behavior,
not proof of a sensor, LED, radio or other peripheral. Physical tests need the selected
board and a documented stimulus. A simulator or source inspection cannot supply that
proof. On a failed or interrupted flash, retain the uncertain outcome and inspect the
device before retrying; do not use erase-all or irreversible provisioning as recovery.
