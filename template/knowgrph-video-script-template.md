---
title: "Knowgrph · Video Script Template (Text → Image → Video)"
graphId: "md:knowgrph-video-script-template"
doc_type: "Video Script Template"
date: "2026-04-28"
lang: en-US

kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgDocumentStructureBaselineLock: false

$schema: "kgc-pipeline/v1"

inputs:
  byteplus_text_model: "seed-2-0-lite-260228"
  byteplus_image_model: "seedream-4-0-250828"
  byteplus_video_model: "seedance-1-0-pro-fast-251015"
  vibe: "cinematic, high detail, coherent lighting"
  duration_seconds: 8
  duration_label: "8s"
  theme: "replace me"
  script: |
    Replace this with your short video script.
  location:
    name: "replace me"
    short_label: "replace me"
    label: "replace me"

spec:
  format: kgc-pipeline
  version: "1.0.0"
  parser: yaml-frontmatter
  execution: computing-flow
  topology: DAG
  ssot_surfaces: [widget_bundle, pipeline, flow.nodes, flow.edges, mermaid, runner]

widget_bundle:
  kind: kg:flow:widgetBundle
  version: 1
  registry: []
  graph:
    type: Graph
    context: frontmatter-flow
    metadata: {kind: frontmatter-flow}
    nodes_ref: [w-text-script, p-text-script, w-img-scene, p-img-scene, w-video-scene, p-video-scene]
    edges_ref: [e-text-script, e-text-script-srcdoc, e-scene-image, e-scene-to-video-ref, e-video]
    display:
      direction: LR
      edgeType: bezier
    behavior:
      drag_pan_zoom_owner: flowEditor-frontmatter-only
      rich_media_overlay_handlers: flowEditor-frontmatter-only
      forbid_cross_renderer_proxy: true

canvas:
  auto_layout: true
  layout_algo: dagre-LR
  snap_to_grid: true
  grid_size: 20
  minimap: true
  controls: true
  node_defaults:
    width: 240
    height: 90
  edge_defaults:
    type: smoothstep
    animated: true

runner:
  entry: R01
  exit: R06
  steps:
    - seq: R01
      action: ingest
      input: "raw file bytes"
      output: "parsed YAML object"
      description: "Parse YAML frontmatter; validate $schema == kgc-pipeline/v1; expose __doc."
    - seq: R02
      action: resolve
      input: "__doc"
      output: "__doc_resolved"
      description: "Resolve {{key}} interpolation for body and tables; expose __doc_resolved."
    - seq: R03
      action: build-graph
      input: "__doc_resolved"
      output: "graph { nodes[], edges[] }"
      description: "Cross-validate SSOT: pipeline[*].node == flow.nodes[*].id.value == mermaid IDs; halt on mismatch."
    - seq: R04
      action: compile-compute
      input: "graph"
      output: "graph (compiled)"
      description: "Compile flow.nodes[*].compute.value to functions; mark nodes async if needed."
    - seq: R05
      action: traverse
      input: "graph (compiled)"
      output: "graph (executed)"
      description: "Materialize widget nodes + edges; connected values resolve into Rich Media Panel render drivers; no feedback arcs."
    - seq: R06
      action: render
      input: "graph (executed) + mermaid + body"
      output: "rendered Knowledge Graph Canvas"
      description: "Render Flow Graph + Pipeline table; apply parseSigil() to cells; auto-layout dagre-LR."

pipeline:
  - seq: W01
    node: w-text-script
    label: "script to prompt breakdown"
    actor: ["user", "AI"]
    edge_in: "prompt_in"
    edge_out: "text_out"
    user_action: "Edit the script and run"
    sys_event: "TextGeneration returns prompts for scene image + final video"
    data_in: "properties.prompt"
    data_out: "properties.output + properties.outputSrcDoc"
    trigger: "run"
    on_fail: "output unchanged"
    confidence: high
    status: TBD
  - seq: W02
    node: w-img-scene
    label: "image generation (reference)"
    actor: ["user", "AI"]
    edge_in: "prompt_in"
    edge_out: "imageUrl"
    user_action: "Run the scene reference image widget"
    sys_event: "ImageGeneration writes imageUrl"
    data_in: "properties.prompt + properties.model"
    data_out: "properties.imageUrl"
    trigger: "run"
    on_fail: "imageUrl unchanged"
    confidence: high
    status: TBD
  - seq: W03
    node: w-video-scene
    label: "video generation"
    actor: ["user", "AI"]
    edge_in: "reference_image"
    edge_out: "videoUrl"
    user_action: "Run the video widget after a reference image exists"
    sys_event: "VideoGeneration writes videoUrl"
    data_in: "properties.prompt + properties.model + properties.duration + properties.reference_image"
    data_out: "properties.videoUrl"
    trigger: "run"
    on_fail: "videoUrl unchanged"
    confidence: high
    status: TBD

mermaid: |
  %%{init: {"theme": "base", "themeVariables": {"primaryColor":"#E1F5EE","primaryTextColor":"#085041","primaryBorderColor":"#1D9E75","lineColor":"#5F5E5A","secondaryColor":"#E6F1FB","tertiaryColor":"#FAEEDA"}}}%%
  flowchart LR
    classDef widget fill:#E1F5EE,stroke:#1D9E75,color:#085041,stroke-width:1.5px
    classDef panel  fill:#EAF3DE,stroke:#639922,color:#27500A,stroke-width:1.5px

    w-text-script["BytePlus Video Script Widget\nTextGeneration\n{{inputs.byteplus_text_model}}"]
    p-text-script["Rich Media Panel\nText · Script"]
    w-img-scene["Image Widget\nScene Reference\n{{inputs.byteplus_image_model}}"]
    p-img-scene["Rich Media Panel\nImage · Scene"]
    w-video-scene["Video Widget\nVideoGeneration\n{{inputs.byteplus_video_model}}\n{{inputs.duration_label}}"]
    p-video-scene["Rich Media Panel\nVideo · Scene"]

    w-text-script -->|text_out → output| p-text-script
    w-img-scene -->|imageUrl → imageUrl| p-img-scene
    w-img-scene -->|imageUrl → reference_image| w-video-scene
    w-video-scene -->|videoUrl → videoUrl| p-video-scene

    class w-text-script,w-img-scene,w-video-scene widget
    class p-text-script,p-img-scene,p-video-scene panel

flow:
  direction: {key: direction, type: string, value: LR}
  edgeType: {key: edgeType, type: string, value: bezier}
  snapToGrid: {key: snapToGrid, type: boolean, value: true}
  computed: {key: computed, type: boolean, value: true}

  nodes:
    - id: {key: id, type: string, value: "w-text-script"}
      type: {key: type, type: string, value: "TextGeneration"}
      label: {key: label, type: string, value: "BytePlus Video Script Widget"}
      phase: {key: phase, type: string, value: "generate"}
      actor: {key: actor, type: array, value: ["user", "AI"]}
      handles: {key: handles, type: object, value: {target: ["prompt_in"], source: ["text_out", "outputSrcDoc"]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "videoScript"}
      chatProvider: {key: chatProvider, type: string, value: "byteplus-modelark"}
      chatAuthMode: {key: chatAuthMode, type: string, value: "serverManaged"}
      chatEndpointUrl: {key: chatEndpointUrl, type: string, value: "https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions"}
      chatModel: {key: chatModel, type: select, value: "{{inputs.byteplus_text_model}}"}
      chatThinkingType: {key: chatThinkingType, type: select, value: "disabled"}
      chatReasoningEffort: {key: chatReasoningEffort, type: select, value: "minimal"}
      chatStream: {key: chatStream, type: boolean, value: true}
      prompt: {key: prompt, type: string, value: "Generate prompts for (1) one scene reference image and (2) the final video. Use: vibe={{inputs.vibe}}, duration={{inputs.duration_label}}, location={{inputs.location.name}}, theme={{inputs.theme}}. Script: {{inputs.script}}. Output as markdown with explicit sections: Scene Image Prompt, Video Prompt."}

    - id: {key: id, type: string, value: "p-text-script"}
      type: {key: type, type: string, value: "RichMediaPanel"}
      label: {key: label, type: string, value: "Rich Media Panel — Text (Script)"}
      phase: {key: phase, type: string, value: "render"}
      actor: {key: actor, type: array, value: ["system", "user"]}
      handles: {key: handles, type: object, value: {target: ["output", "outputSrcDoc"], source: ["output", "outputSrcDoc"]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "richMediaPanel"}
      output: {key: output, type: string, value: ""}
      outputSrcDoc: {key: outputSrcDoc, type: string, value: ""}
      media_interactive: {key: media_interactive, type: boolean, value: true}

    - id: {key: id, type: string, value: "w-img-scene"}
      type: {key: type, type: string, value: "ImageGeneration"}
      label: {key: label, type: string, value: "Image Widget — Scene Reference"}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "imageGeneration"}
      model: {key: model, type: select, value: "{{inputs.byteplus_image_model}}"}
      prompt: {key: prompt, type: textarea, value: "{{inputs.vibe}}, {{inputs.duration_label}}; {{inputs.location.label}}; {{inputs.theme}}. Script: {{inputs.script}}. Single coherent frame, 16:9."}
      size: {key: size, type: select, value: "2K"}
      output_format: {key: output_format, type: select, value: "jpeg"}
      response_format: {key: response_format, type: select, value: "b64_json"}
      optimize_prompt_options: {key: optimize_prompt_options, type: select, value: "fast"}
      aspect_ratio: {key: aspect_ratio, type: number, value: 0.0625}
      stream: {key: stream, type: boolean, value: true}
      watermark: {key: watermark, type: boolean, value: false}
      seed: {key: seed, type: number, value: 0}
      guidance_scale: {key: guidance_scale, type: number, value: 0}
      reference_image: {key: reference_image, type: string, value: ""}
      handles: {key: handles, type: object, value: {target: ["reference_image"], source: ["imageUrl"]}}
      phase: {key: phase, type: string, value: "generate"}
      actor: {key: actor, type: array, value: ["user", "AI"]}

    - id: {key: id, type: string, value: "p-img-scene"}
      type: {key: type, type: string, value: "RichMediaPanel"}
      label: {key: label, type: string, value: "Rich Media Panel — Image (Scene)"}
      phase: {key: phase, type: string, value: "render"}
      actor: {key: actor, type: array, value: ["system", "user"]}
      handles: {key: handles, type: object, value: {target: ["imageUrl", "outputSrcDoc"], source: ["imageUrl", "outputSrcDoc"]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "richMediaPanel"}
      imageUrl: {key: imageUrl, type: string, value: ""}
      outputSrcDoc: {key: outputSrcDoc, type: string, value: ""}
      media_interactive: {key: media_interactive, type: boolean, value: true}

    - id: {key: id, type: string, value: "w-video-scene"}
      type: {key: type, type: string, value: "VideoGeneration"}
      label: {key: label, type: string, value: "Video Widget — Scene"}
      phase: {key: phase, type: string, value: "generate"}
      actor: {key: actor, type: array, value: ["user", "AI"]}
      handles: {key: handles, type: object, value: {target: ["reference_image"], source: ["videoUrl"]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "videoGeneration"}
      model: {key: model, type: select, value: "{{inputs.byteplus_video_model}}"}
      prompt: {key: prompt, type: string, value: "{{inputs.vibe}}, {{inputs.duration_label}}; {{inputs.location.name}}; {{inputs.theme}}. Script: {{inputs.script}}"}
      ratio: {key: ratio, type: select, value: "16:9"}
      resolution: {key: resolution, type: select, value: "480p"}
      duration: {key: duration, type: number, value: "{{inputs.duration_seconds}}"}
      generate_audio: {key: generate_audio, type: boolean, value: false}
      draft: {key: draft, type: boolean, value: true}
      camera_fixed: {key: camera_fixed, type: boolean, value: false}
      image_url_url: {key: image_url_url, type: select, value: "base64"}
      reference_image: {key: reference_image, type: string, value: ""}

    - id: {key: id, type: string, value: "p-video-scene"}
      type: {key: type, type: string, value: "RichMediaPanel"}
      label: {key: label, type: string, value: "Rich Media Panel — Video (Scene)"}
      phase: {key: phase, type: string, value: "render"}
      actor: {key: actor, type: array, value: ["system", "user"]}
      handles: {key: handles, type: object, value: {target: ["videoUrl", "outputSrcDoc"], source: ["videoUrl", "outputSrcDoc"]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "richMediaPanel"}
      videoUrl: {key: videoUrl, type: string, value: ""}
      outputSrcDoc: {key: outputSrcDoc, type: string, value: ""}
      media_interactive: {key: media_interactive, type: boolean, value: true}

  edges:
    - {id: e-text-script, source: w-text-script, sourceHandle: text_out, target: p-text-script, targetHandle: output, label: "text_out → output", animated: true}
    - {id: e-text-script-srcdoc, source: w-text-script, sourceHandle: outputSrcDoc, target: p-text-script, targetHandle: outputSrcDoc, label: "outputSrcDoc → outputSrcDoc", animated: true}
    - {id: e-scene-image, source: w-img-scene, sourceHandle: imageUrl, target: p-img-scene, targetHandle: imageUrl, label: "imageUrl → imageUrl", animated: true}
    - {id: e-scene-to-video-ref, source: w-img-scene, sourceHandle: imageUrl, target: w-video-scene, targetHandle: reference_image, label: "imageUrl → reference_image", animated: true}
    - {id: e-video, source: w-video-scene, sourceHandle: videoUrl, target: p-video-scene, targetHandle: videoUrl, label: "videoUrl → videoUrl", animated: true}
---

# Video Script Template (Text → Image → Video)

This document is a machine-readable + human-readable SSOT for a minimal rich-media generation loop.

## Inputs

Edit these frontmatter values:

- `inputs.vibe`: `{{inputs.vibe}}`
- `inputs.duration_label`: `{{inputs.duration_label}}`
- `inputs.location.name`: `{{inputs.location.name}}`
- `inputs.theme`: `{{inputs.theme}}`
- `inputs.script`: short script text

Prompt contract:

```text
{{inputs.vibe}}, {{inputs.duration_label}}; {{inputs.location.name}}; {{inputs.theme}}. Script: {{inputs.script}}
```

## Flow Graph

The `mermaid` and `flow` blocks describe the same graph. The Rich Media Panels render the output values written by the widgets.

## Pipeline

`W01` generates structured prompts, `W02` creates a reference image, and `W03` generates the video from that reference.
