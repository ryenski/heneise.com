# AI Deep-Dive Cover Series Design

## Scope

Create one cover image for each of the seven posts in the `ai-glossary-deep-dives` series, dated August 10 through August 24, 2026. The covers belong to the same visual family as the August 8 glossary cover.

## Art direction

Use a modular dossier composition: warm cream paper, clipped index cards, small scraps of typed material, black technical diagrams, and restrained red pencil or ink marks. Paper texture and real-looking fasteners should make the work feel assembled by hand. Keep the frame spacious enough to read at card size.

Each cover should share the same palette, light, camera angle, material treatment, and editorial tone. The compositions may vary, but they should look like seven pages pulled from one field guide. Avoid glossy science fiction, glowing brains, humanoid robots, generic circuit boards, neon gradients, and fake application screens.

Do not place an article title in the image. Use two to four short labels only when they help explain the diagram. Text must remain sparse because generated lettering becomes unreliable at small sizes.

## Cover concepts

| Date | Post | Visual idea |
|---|---|---|
| Aug 10 | How AI models work without the math | A token strip feeds into a layered training card, then exits through a separate inference path. A red correction separates `TRAINING` from `INFERENCE`. |
| Aug 12 | What actually happens when you chat with AI | A user message card passes through a stack labeled `PROMPT`, `CONTEXT`, and `TOOLS` before reaching an `OUTPUT` card. Hidden instructions peek from beneath the stack. |
| Aug 14 | How AI finds information, reasons, and changes behavior | Three connected mechanisms: an index of retrieved pages, an embedding map of plotted points, and a weight-adjustment card. Red marks show that retrieval and tuning change different parts of the system. |
| Aug 17 | Anatomy of an AI agent | A circular agent loop connects `PLAN`, `ACT`, `OBSERVE`, and `REVISE`, with tool cards clipped around it. A boundary line marks permissions and the software holding the loop together. |
| Aug 19 | From one agent to autonomous systems | One central agent card branches into a small set of delegated cards inside a sandbox boundary. Checkpoints and a red approval gate keep the composition from implying unlimited autonomy. |
| Aug 21 | Open, closed, local, and hosted | A four-quadrant arrangement compares sealed, open, local, and hosted stacks using boxes, keys, a small machine, and a remote terminal. Connector lines keep model, provider, product, and runtime distinct. |
| Aug 24 | Going beyond the chat | A repeatable business workflow moves through inputs, an agent workbench, a human approval stamp, and finished output. A red hand-drawn gate reserves consequential decisions for a person. |

## File integration

Generate each cover at the existing 1672 × 941 ratio. Save it as `assets/images/<post-slug>/cover.jpg`, then add the matching root-relative path to the post's `image` front matter.

## Acceptance checks

- Seven image files exist and open successfully at 1672 × 941.
- All seven posts point to their own cover through `image` front matter.
- The images read as one series beside the August 8 glossary cover.
- Every cover has a distinct topic metaphor and remains legible as a small preview.
- Lettering is sparse, correct, and free of mangled characters.
- A local site build succeeds after the files and front matter change.
