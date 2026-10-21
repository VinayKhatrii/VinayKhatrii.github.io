
if (new URLSearchParams(location.search).has('audit')) {
  async function runAudit() {
    if (!document.querySelector('main h1') || !window.axe) return;
    await document.fonts.ready;
    const result = await axe.run(document);
    let report = document.getElementById('audit-report');
    if (!report) {
      report = document.createElement('pre');
      report.id = 'audit-report';
      report.hidden = true;
      document.body.append(report);
    }
    report.textContent = JSON.stringify({
      violations: result.violations.map(v => ({id:v.id,impact:v.impact,nodes:v.nodes.map(n => ({html:n.html,summary:n.failureSummary}))})),
      passes: result.passes.length,
      incomplete: result.incomplete.map(v=>v.id)
    });
  }
  setTimeout(runAudit, 1200);
  document.addEventListener('click', event => {
    if (event.target.closest('.project-index button')) setTimeout(runAudit, 700);
  });
}
