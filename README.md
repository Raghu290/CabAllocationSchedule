# CabAllocationSchedule

INstall local Graphhopper server. 
https://github.com/graphhopper/graphhopper/blob/master/docs/core/quickstart-from-source.md

You have created your public key in omniscale use it for tiles from server.

start graphopper server
./graphhopper.sh -a web -i hyderabad.osm.pbf


What the two are

Neo4j is probably the most well-known property graph database. It has a mature ecosystem, good tooling, lots of documentation, the Cypher query language, and is good for typical graph workloads (short traversals, relationships, path finding, etc.).

TigerGraph is newer, designed for scale, high performance for analytical queries on big graphs, distributed processing, etc. It uses GSQL, supports parallelism, and aims to handle “both analytics (OLAP) + transactional traversals” at scale. 
TigerGraph
+4
arXiv
+4
TigerGraph Documentation
+4

Where TigerGraph tends to outperform Neo4j

From published benchmarks and user feedback, these are TigerGraph’s advantages:

Scale / performance on large, complex analytics / BI queries

In LDBC SNB benchmark studies, TigerGraph outperformed Neo4j by orders of magnitude for many complex queries as data size scaled. 
TigerGraph
+3
arXiv
+3
TigerGraph
+3

Neo4j in those tests sometimes couldn’t complete certain business intelligence queries within a reasonable time, whereas TigerGraph could. 
arXiv
+1

More efficient storage / lower hardware requirements

TigerGraph compresses data better, so for same raw data it tends to need less disk/RAM. 
TigerGraph
+3
ar5iv
+3
TigerGraph
+3

Loading and query response times on large graphs scale better with more machines. 
TigerGraph
+2
arXiv
+2

Better suitability for distributed, parallel graph processing

TigerGraph was built with distributed / parallel processing in mind (“native, real-time, MPP graph database”). 
arXiv
+2
TigerGraph Documentation
+2

Graph algorithms like PageRank, connected components, etc., seem to scale better. 
TigerGraph
+2
TigerGraph
+2

Hybrid / combined analytics + real-time updates

TigerGraph supports updates/inserts in real time, plus analytics workflows. If you need to do both, it tends to be more capable. 
TigerGraph Documentation
+2
TigerGraph
+2

Where Neo4j may still be stronger (or more suitable)

While TigerGraph looks very good for certain large and complex use-cases, Neo4j has its advantages:

Maturity, ecosystem, community & tooling

Neo4j has been around longer in this space, many libraries, integrations, UI tools, learning resources. If you need off-the-shelf connectors, visualization, monitoring tools, etc., Neo4j may have more ready-to-use options.

Simplicity / developer experience for smaller or mid-sized graphs

For many graph use cases that aren't super big (e.g. few million or tens of millions of nodes/edges, moderate query complexity), Neo4j is “good enough” and easier to set up, simpler to operate.

Cypher language + clarity

Many find Cypher more intuitive for path queries, pattern matching, ad hoc graph traversals. If users are comfortable with that, productivity may be higher with Neo4j.

Transactional (OLTP) use cases

For workloads with many small, fast traversals, updates, and strict transactional consistency, Neo4j has strong support. Though TigerGraph also offers ACID support. 
TigerGraph Documentation
+2
TigerGraph
+2

Smaller scale / budget-friendly

For smaller datasets, less demanding performance, possibly fewer machines needed, Neo4j (especially Community Edition or smaller enterprise setups) may cost less in terms of operational complexity.

Trade-offs and gotchas

For extreme scale or very deep traversals (many “hops”), if you choose Neo4j you might run into performance, memory, or clustering limitations. There are user reports of Neo4j struggling with very large graphs (hundreds of millions nodes) in terms of backups, count operations, etc. 
TrustRadius
+2
TigerGraph
+2

Licensing/cost: both have enterprise versions; cost escalates with scale. You’ll want to model what your hardware, maintenance, licensing will cost.

Complexity of deployment/operations for TigerGraph might be higher if you want to exploit its full distributed, high-parallel performance.

Query language learning curve: GSQL (TigerGraph) is powerful but may require more learning if your teams are used to Cypher or more declarative languages. Also, moving existing queries may require rewriting etc.

Conclusion: Is TigerGraph “better”?

Yes—in many situations, especially when:

Your graph is large (many millions/billions of nodes/edges).

You need to run heavy analytics (deep traversals, many hops, pattern heavy BI queries).

You care about performance & storage efficiency at scale.

You want distributed parallel execution.

Neo4j might be “better enough” (and simpler) when:

Your data and workloads are more modest in size/complexity.

You prioritize developer agility and ecosystem richness.

You have transactional graph workloads, shorter traversals, etc.

You prefer maturity, robust community support, many existing tools.





et’s analyze your case in context: 30 M nodes, 40 M edges, hierarchical graph up to 15 levels deep.

⚙️ 1. Nature of your workload

Since you’re dealing with hierarchical data (multi-level traversals), the depth of traversal is the key bottleneck — not just the number of nodes.

If your main operations involve:

Walking up/down the hierarchy (e.g. “find all descendants of node X up to level 15”), or

Aggregating / analyzing across subtrees (“sum metrics across all child branches”),

then you’re effectively running deep graph traversals, which are more analytical (OLAP-like) than simple transactional lookups.

🦾 2. How Neo4j handles this scale

Neo4j can comfortably handle tens of millions of nodes and edges if your queries aren’t too deep — say 3–5 hops.
But once you start going 10–15 levels deep, performance can drop sharply, because:

Each hop can cause an exponential explosion in visited nodes.

Neo4j’s architecture (especially in single-instance mode) is memory-centric — you may hit heap pressure and GC overhead.

Its clustering is primarily for high availability, not true parallel graph computation.

Neo4j Enterprise with sufficient RAM (e.g. >64 GB heap, >128 GB OS RAM) can still do it, but latency may rise to seconds or minutes for large hierarchy walks.

✅ Neo4j is excellent for

OLTP-style lookups (short traversals, frequent small updates)

Developer productivity

Integration and tooling

⚠️ Limitations for your case

Deep traversals (15 levels) will likely degrade in speed.

Parallelism is limited — no built-in distributed query execution.

Scaling horizontally beyond one node is non-trivial.

⚡ 3. How TigerGraph handles this scale

TigerGraph was designed precisely for deep, high-fan-out traversals on large graphs. It uses a Massively Parallel Processing (MPP) architecture, meaning:

Each traversal step can be executed across partitions in parallel.

Query runtime increases roughly linearly, not exponentially, with depth (given enough machines).

It can easily handle hundreds of millions or billions of edges.

Its GSQL language also supports iterative and recursive algorithms efficiently — ideal for hierarchical exploration.

✅ TigerGraph is excellent for

Multi-level traversals (deep hierarchies)

Aggregate queries over subtrees

Parallel analytics (e.g. PageRank, path scoring, influence metrics)

Scaling out on multiple servers

⚠️ Trade-offs

Steeper learning curve (GSQL)

Fewer off-the-shelf integrations compared to Neo4j

More operational overhead if deploying distributed clusters

🧮 4. Rough recommendation for your workload
Criteria	Neo4j	TigerGraph
Data size (30 M nodes / 40 M edges)	✅ Acceptable (upper mid-range)	✅ Easily handled
Depth (up to 15 levels)	⚠️ Slow for deep traversals	✅ Efficient via parallel BFS
Query type (hierarchical aggregations)	⚠️ Moderate performance	✅ Excellent
Ease of setup / dev	✅ Easier	⚠️ Steeper
Ecosystem & tooling	✅ Rich	⚠️ Limited
Scaling horizontally	⚠️ Limited	✅ Native MPP support
Cost & licensing	✅ Cheaper small-scale	⚠️ Higher for clusters
✅ Conclusion

For your scenario:

30 M nodes, 40 M edges, up to 15-level hierarchy traversal

TigerGraph would likely outperform Neo4j significantly — both in query latency and scalability.
If you expect:

Complex or deep recursive queries, or

Need to run frequent analytical computations (aggregations, influence scores, path discovery),

then TigerGraph is the better long-term choice.

However, if:

Your queries are mostly shallow (≤ 3–5 hops), or

You prioritize ease of use and developer tooling,

then Neo4j may still suffice.

Would you like me to help you model how many servers (and memory) you’d need for TigerGraph to handle that load efficiently? I can give an approximate cluster sizing and architecture recommendation.

You said:
I want to use graph rag as well, what are the options I got
ChatGPT said:

If by graph RAG you mean using your knowledge graph / graph database together with vector retrieval (or other retrieval methods) + LLMs (Retrieval-Augmented Generation enhanced by graph structure), then yes — there are quite a few options and design patterns. I can outline some of the tools and approaches, trade-offs, and which ones might suit you best given your scale and hierarchical data.

🔍 What is GraphRAG

GraphRAG (Graph Retrieval-Augmented Generation) is a technique where instead of (or in addition to) just fetching relevant documents via vector similarity, you use structure from a knowledge graph:

You may retrieve nodes/entities and edges/subgraphs relevant to the query.

Use the graph context (relations, paths, multi-hop structure) to enrich or filter what the LLM sees.

You may combine vector search + graph traversal + Cypher (or whatever query language) to get the context.

This improves explainability, helps multi-hop reasoning, aids in hierarchical or structured queries. 
graphacademy.neo4j.com
+3
GraphRAG
+3
TigerGraph
+3

⚙️ Tools / Libraries / Frameworks you can use

Here are some of the current tools you could adopt or adapt, including open source and commercial.

Tool / Library	What it Provides / Strengths	Considerations
Neo4j + LangChain / Neo4j GenAI Stack	Neo4j supports vector indexes + keyword/full-text indexes; they have built-in support for GraphRAG workflows: e.g. GraphCypherQAChain, Graph-enhanced retrievers; you can write Cypher queries generated from the LLM. 
Graph Database & Analytics
+3
Graph Database & Analytics
+3
Graph Database & Analytics
+3
	Good integration, mature; but performance depends heavily on how optimized your graph/traversal is, how much of the graph you need to pull in for a query. Also, costs and memory usage could rise for deep traversals.
TigerGraph	They have a definition of GraphRAG in their glossary; since TigerGraph is built for large, multi-hop graphs and good performance at scale, it's a strong candidate. 
TigerGraph
	Possibly more complex to set up; might need to build custom ingestion / retrieval pipelines; support for vector stores may be less mature or require more work than Neo4j in some cases.
NebulaGraph	They also have a GraphRAG offering; using the knowledge graph to strengthen retrieval. 
nebula-graph.io
	As with any newer platform: check for maturity, documentation, how well it integrates with LLMs / embeddings etc.
AWS / GraphRAG Toolkit (awslabs)	The GraphRAG Toolkit is a Python library for combining graph + vector store retrieval + QA over unstructured/semi-structured content. It supports indexing, hybrid retrieval, etc. 
Amazon Web Services, Inc.
+1
	Using external toolkits introduces more pieces to maintain; you’ll need to ensure latency is acceptable; managing embedding updates etc.
Frameworks like LlamaIndex / LangChain / others	These allow more flexible pipelines: ingest documents, build knowledge graphs via entity extraction, relationships; query them; combine with vector retrieval; build QA applications. 
Medium
+1
	More DIY: you’ll need to define what your graph schema is, what entities you track, how you map relationships; performance can vary.
🏗️ How it could work with your data (≈30M nodes, 40M edges, hierarchies up to 15 levels)

Given your scale and hierarchical component, here’s how you might architect a GraphRAG system, plus things to watch out for.

Hybrid retrieval

Use vector search (on document text / node embeddings) to identify likely relevant items.

Use graph traversal (multi-hop, up to your 15 levels) to bring in structure around those items: ancestors / descendants / siblings etc.

Use keyword / full text search as a fallback or prefilter.

Graph summarization / pruning

If you traverse many levels, you’ll get many nodes/subgraphs. You need to decide how much of that to include into the LLM prompt/context. Maybe prune by relevance (distance, weight), or limit subgraph size.

Maybe use graph patterns: e.g. only follow edges of certain types that are more semantically useful.

Schema & modeling matters

Because you have hierarchies, it helps to define node types and relationship types well. Having “parent_of”, “child_of”, “belongs_to”, etc., so your queries can navigate in a structured way.

Indexing important node properties (e.g., name, label, embeddings) so that retrieval + traversal is efficient.

Integration with LLM

You’ll need a component that converts query → which nodes/subgraphs to fetch (could be via LLM-generated query e.g. Cypher).

Then build prompt: combine textual content + structured graph context.

Be aware of token limits; you may need to summarize or compress content / graph info.

Performance & scaling

For 30M nodes, 40M edges, graph database must support multi-hop performance at that scale. Choose one with good performance or distributed graph processing.

Embedding computation: embeddings for nodes or documents must be stored and updated.

Caching frequently used subgraphs or results.

✅ Which options are likely best for your case

Given what you described, here are recommendations of what to use / try first:

Neo4j is a strong candidate, especially Neo4j Enterprise with vector indexing. It lets you do the hybrid approaches (vector + graph + full-text) and you can generate Cypher via LLMs. Might be simpler to set up initially.

TigerGraph could be very powerful, especially for deep hierarchical queries and high throughput of traversals, but you’ll need to build more of the pipe yourself: embedding store, retrieval logic etc.

Use the GraphRAG Toolkit (AWS) or similar as part of your pipeline to handle indexing + query logic, so you don’t reinvent everything.

Use or adapt components from LangChain / LlamaIndex, in particular the part that generates graph queries (Cypher or equivalent) from natural language, and that manages both graph and vector retrieval.




Pometry Temporal Graph

1. Overview

This document explains how a temporal graph platform like Pometry can support:

Natural Language Query (NLQ)

Vector Embedding & Semantic Search

Temporal Graph Traversal

GraphQL API Access

Fine-Grained Entitlements

Field-Level Masking

Edge-Level Access Control

Time-Bound Authorization

Two complete use cases are covered:

Non-Fine-Grained Access

Fine-Grained Access Control

2. Core Architecture Components
2.1 Natural Language to Graph Flow
User Question
    ↓
LLM
    ↓
Vector Embedding
    ↓
Semantic Search (Top-K Nodes)
    ↓
GraphQL Traversal
    ↓
Temporal Filtering
    ↓
Optional LLM Summarization
    ↓
Response

2.2 Key Capabilities
Vector Embedding

Convert NLQ into vector representation

Store embeddings on nodes

Use cosine similarity or ANN index

Retrieve semantically related nodes

Temporal Graph

Each:

Node has valid_from / valid_to

Edge has valid_from / valid_to

Queries support time windows

GraphQL API

GraphQL is used to:

Query nodes

Traverse relationships

Apply filters

Enforce entitlements

Control returned fields

3. Use Case 1 — NLQ/Semantic/Graphql/Temporal
3.1 Scenario

User asks:

“Show me accounts with fraud-like behavior connected to Company X in the last 30 days.”

In this case:

No user-specific filtering

No field masking

All accessible graph data returned

3.2 Processing Flow

NLQ converted to embedding

Semantic search retrieves relevant accounts

GraphQL fetches connected companies

Temporal filter: last 30 days

Return full data

3.3 Semantic Search Query
query SemanticSearch(
  $embedding: [Float!]!,
  $topK: Int = 10,
  $startTime: String!,
  $endTime: String!
) {
  semanticSearch(
    embedding: $embedding
    topK: $topK
    filter: {
      timestamp: { after: $startTime, before: $endTime }
    }
  ) {
    nodeId
    score
    properties {
      name
      type
      behavior
      timestamp
    }
  }
}

3.4 Graph Traversal Query
query GraphContext(
  $nodeIds: [ID!]!,
  $startTime: String!,
  $endTime: String!
) {
  nodes(ids: $nodeIds) {
    id
    name
    type
    properties {
      behavior
      riskScore
      lastActivity
    }
    connectedEntities(
      filter: {
        relationship: {
          valid_from: { after: $startTime }
          valid_to: { before: $endTime }
        }
      }
    ) {
      id
      name
      type
      relationship {
        type
        valid_from
        valid_to
      }
    }
  }
}

3.5 Characteristics

No department restriction

No role filtering

No property masking

Full visibility within time window

4. Use Case 2 — Fine-Grained Entitlements
4.1 Scenario

Same question, but user access is restricted by:

Department

Role

Edge Type

Time Window

Field-Level Visibility

5. Fine-Grained Entitlement Model
5.1 Node-Level Filtering

User can only see:

node.department == user.department

5.2 Edge-Level Filtering

User can only traverse:

relationship.type == "Approved"

5.3 Temporal Entitlement

User access limited to:

relationship.valid_from >= user.access_start
relationship.valid_to <= user.access_end

5.4 Field-Level Masking

Sensitive properties hidden unless:

user.role == "analyst"

6. Fine-Grained Semantic Search Query
query SemanticSearch(
  $embedding: [Float!]!,
  $topK: Int = 10,
  $startTime: String!,
  $endTime: String!,
  $userDept: String!,
  $userRole: String!
) {
  semanticSearch(
    embedding: $embedding
    topK: $topK
    filter: {
      timestamp: { after: $startTime, before: $endTime }
      properties: { department: $userDept }
    }
  ) {
    nodeId
    score
    properties {
      name
      type
      behavior @include(if: $userRole == "analyst")
      riskScore @include(if: $userRole == "analyst")
      timestamp
    }
  }
}

7. Fine-Grained Graph Traversal
query GraphContext(
  $nodeIds: [ID!]!,
  $startTime: String!,
  $endTime: String!,
  $userDept: String!,
  $userRole: String!
) {
  nodes(ids: $nodeIds) {
    id
    name
    type
    properties {
      department
      behavior @include(if: $userRole == "analyst")
      riskScore @include(if: $userRole == "analyst")
    }
    connectedEntities(
      filter: {
        properties: { department: $userDept }
        relationship: {
          type: "Approved"
          valid_from: { after: $startTime }
          valid_to: { before: $endTime }
        }
      }
    ) {
      id
      name
      type
      relationship {
        type
        valid_from
        valid_to
      }
    }
  }
}

8. Fine-Grained Architecture Flow
User NLQ
    ↓
Authentication
    ↓
Load User Entitlements
    ↓
LLM → Vector Embedding
    ↓
Semantic Search (Department Filter Applied)
    ↓
GraphQL Traversal (Edge + Time + Dept Filters)
    ↓
Field Masking (Role-Based)
    ↓
Merge + Rank
    ↓
Optional LLM Summary
    ↓
Final Response

9. Comparison Summary
Feature	Non-Fine-Grained	Fine-Grained
Department Filtering	❌	✅
Role-Based Masking	❌	✅
Edge-Type Filtering	❌	✅
Temporal Access Limits	Basic	User-Specific
Field-Level Security	❌	✅
GraphQL Filtering	Basic	Entitlement-Aware
10. Enterprise Considerations

For production systems:

Push entitlements into GraphQL resolvers

Apply filters server-side (never client-side)

Use row-level security at DB layer

Use policy engine (OPA, ABAC, RBAC hybrid)

Log entitlement decisions for audit

Cache user policy context per session

11. Conclusion

Pometry-style temporal graph architecture supports:

Time-aware graph modeling

Vector-based semantic retrieval

GraphQL-based traversal

Enterprise-grade fine-grained entitlements

Field-level masking

Edge-level restrictions

Time-bound authorization

This enables secure, explainable, and context-aware graph querying suitable for:

Fraud detection

Risk intelligence

Supply chain analysis

Regulatory audit

Investigations
