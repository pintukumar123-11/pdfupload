function buildPrompt(documentText, question) {
  return `
You are an assistant helping users understand documents by providing concise, easy-to-read summaries.

Document content:
"""
${documentText}
"""

Please answer the following question. Your response should be:
- A simple, clear, human-friendly summary.
- Start with a brief introductory paragraph.
- Follow with a bulleted list of key highlights, using concise phrases for each point.
- End with a brief concluding sentence.
- IMPORTANT: Do NOT use any HTML tags, Markdown (like bolding, italics, or code blocks), or special characters for formatting beyond standard bullet points.

Question: ${question}
Answer:
Why this revision helps:

"Concise, easy-to-read summaries": Reinforces the desired style upfront.

Explicit Structure: "Start with...", "Follow with...", "End with..." guides the generation of distinct sections.

Bullet Point Clarity: "bulleted list of key highlights, using concise phrases" tells the LLM to use actual bullet characters (- or *) and to keep each point short.

Strong Negative Constraints: "Do NOT use any HTML tags, Markdown... or special characters..." directly addresses the issue you faced with the previous output. LLMs respond very well to explicit negative constraints.

How to use this revised prompt:

Replace ${documentText} with the content of the document you want summarized.

Replace ${question} with the question about the document.

Send this entire combined text to your LLM API.

2. Fine-tuning (For High-Consistency & Specific Style)
If even with the improved prompt, your LLM still struggles to consistently produce the exact desired format (especially for a very specific, custom style like yours), then fine-tuning is the next step.

Fine-tuning involves training the LLM on a custom dataset of input-output pairs that exemplify the exact behavior you want.

How to create a fine-tuning dataset for your goal:

Your dataset would look like this:

JSON

[
  {
    "messages": [
      {"role": "system", "content": "You are an assistant helping users understand documents by providing concise, easy-to-read summaries."},
      {"role": "user", "content": "Document content:\n\"\"\"\n[Document 1 Content Here]\n\"\"\"\n\nPlease answer the following question. Your response should be:\n- A simple, clear, human-friendly summary.\n- Start with a brief introductory paragraph.\n- Follow with a bulleted list of key highlights, using concise phrases for each point.\n- End with a brief concluding sentence.\n- IMPORTANT: Do NOT use any HTML tags, Markdown (like bolding, italics, or code blocks), or special characters for formatting beyond standard bullet points.\n\nQuestion: What is the main policy about?"},
      {"role": "assistant", "content": "Blufig Digital's Information Security Policy is designed to protect client data and ensure smooth business operations. It applies to all individuals working for or with Blufig, including employees, contractors, and clients accessing Blufig systems. The policy covers all types of information and technology assets, whether in the office, at home, or in the cloud.\n\nKey highlights include:\n\n- Clear Objectives – Comply with legal requirements, manage vendor risks, safeguard data, and promote a security-focused culture.\n- Management Commitment – Leadership provides resources and enforces accountability for security.\n- Designated Teams – An Information Security Steering Committee and IT team oversee implementation.\n- Asset Management – Data is identified and classified to apply appropriate security measures.\n- Risk Management – Security risks are assessed and mitigated proactively.\n- HR Security – Background checks, agreements, and termination protocols secure personnel access.\n- Remote Work Security – Guidelines support secure communication and data handling for remote workers.\n- Incident Management – A response plan is in place to quickly resolve security issues.\n- Business Continuity – Strategies ensure operations can continue during disruptions.\n- Training and Awareness – Ongoing programs keep employees informed on threats and best practices.\n- Supporting Policies – Includes dedicated policies for data privacy, data loss prevention, mobile device management, and access control.\n- Review and Communication – The policy is reviewed regularly and communicated to all staff, with acknowledgment required.\n\nThis comprehensive and adaptive approach reflects Blufig Digital’s strong commitment to data protection and client trust."}
    ]
  },
  {
    "messages": [
      {"role": "system", "content": "You are an assistant helping users understand documents by providing concise, easy-to-read summaries."},
      {"role": "user", "content": "Document content:\n\"\"\"\n[Document 2 Content Here]\n\"\"\"\n\nPlease answer the following question. Your response should be:\n- A simple, clear, human-friendly summary.\n- Start with a brief introductory paragraph.\n- Follow with a bulleted list of key highlights, using concise phrases for each point.\n- End with a brief concluding sentence.\n- IMPORTANT: Do NOT use any HTML tags, Markdown (like bolding, italics, or code blocks), or special characters for formatting beyond standard bullet points.\n\nQuestion: [Question about Document 2]"},
      {"role": "assistant", "content": "[Desired summary output for Document 2, matching the Blufig style]"}
    ]
  }
  // ... more examples
]

Question: ${question}
Answer:
  `.trim();
}

module.exports = { buildPrompt };
