# Architecture

CliniNote uses a small hexagonal architecture.

```txt
HTTP -> Use Case -> Port -> Adapter
```

The domain layer is pure TypeScript and must not depend on Express, database clients, MCP, OpenAI/LLM SDKs, or PDF libraries.

Use cases depend on ports. Infrastructure adapters implement ports. Dependency injection wires concrete adapters at application startup.
