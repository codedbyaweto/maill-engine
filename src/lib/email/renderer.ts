export function renderEmail(template: any) {
    return `
  <table width="100%">
    ${template.sections
        .map(
            (s: any) => `
      <tr><td>
        ${s.rows
                .map(
                    (r: any) => `
          <table width="100%">
            <tr>
              ${r.columns
                        .map(
                            (c: any) => `
                <td width="${100 / r.columns.length}%">
                  ${c.blocks
                                .map((b: any) => renderBlock(b))
                                .join("")}
                </td>
              `
                        )
                        .join("")}
            </tr>
          </table>
        `
                )
                .join("")}
      </td></tr>
    `
        )
        .join("")}
  </table>
  `;
}

function renderBlock(block: any) {
    if (block.type === "text") return `<p>${block.content}</p>`;
    if (block.type === "image") return `<img src="${block.src}" width="100%" />`;
    if (block.type === "button")
        return `<a href="${block.url}">${block.text}</a>`;
}