# Knowledge Graph JSON-LD Schema v1.0.0 - Pipeline and Renderer Guidelines Companion Continuation

> Continuation from `README.pipeline-and-renderer-guidelines.md`.

## 📚 Resources

- **Example Data:** See `example-graph.jsonld` and `example-lean-startup-layer-modes.jsonld`
- **Renderer Palette:** See `colors.jsonld` (Lean Startup MVP node/edge palette shared across layer modes)
- **Agentic Use Cases:** See "Why This Schema Matters for Agentic GraphRAG"

---

## 🤝 Contributing

### **Adding Language Support**
1. Fork schema files
2. Add `@language` entries to `rdfs:label` and `rdfs:comment`
3. Update `@context` default language if needed
4. Test with multilingual data

### **Extending Schema (Backward Compatible)**
1. Add new optional fields to context.jsonld
2. Increment minor version (1.0.0 → 1.1.0)
3. Document in CHANGELOG.md
4. Never make new fields required

---

## ⚖️ License

MIT License - Use freely in commercial and open-source projects

---

## 📞 Support

- **Issues:** github.com/huijoohwee/huijoohwee.github.io/issues
- **Discussions:** For agentic GraphRAG patterns
- **Email:** Schema maintainer contact

**Status:** Production Ready ✅
