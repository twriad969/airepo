export default function DocsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-12">Documentation</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Getting Started</h2>
        <p>
          Welcome to Prompt documentation. This guide will help you get started with using our AI-powered prompt enhancement tool.
        </p>

        <h2>Basic Usage</h2>
        <p>
          Simply enter your prompt in the text area and click the "Enhance" button. Our AI will analyze your prompt and suggest improvements.
        </p>

        <h2>Pro Features</h2>
        <p>
          Pro users get access to advanced features including:
        </p>
        <ul>
          <li>Advanced context analysis</li>
          <li>Priority processing</li>
          <li>Unlimited requests</li>
          <li>Premium support</li>
        </ul>

        <h2>API Reference</h2>
        <p>
          Coming soon: Integrate Prompt directly into your applications with our API.
        </p>
      </div>
    </div>
  );
}