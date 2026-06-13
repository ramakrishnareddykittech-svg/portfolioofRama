# Ramakrishna Reddy Kandala - Cloud and DevOps Portfolio

The maintained source for Ramakrishna Reddy Kandala's portfolio.

Live site after GitHub Pages deployment:

`https://ramakrishnareddykittech-svg.github.io/portfolioofRama/`

## What Is Included

- Azure, AKS, Terraform, CI/CD, security, and observability experience
- a sanitized AKS and Terraform case study with an architecture diagram
- two complete technical articles
- downloadable resume
- responsive light and dark themes
- GitHub Pages verification and deployment workflow

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- assets/
|-- articles/
|-- case-studies/
|-- scripts/check-site.mjs
`-- .github/workflows/deploy-pages.yml
```

## Local Validation

Requires Node.js 22 or newer:

```powershell
npm run check
```

## Local Preview

From PowerShell:

```powershell
python -m http.server 5180 --bind 127.0.0.1
```

Open:

`http://127.0.0.1:5180/`

## Deployment

Pushes to `main` run `.github/workflows/deploy-pages.yml`.

The workflow:

1. validates JavaScript and all local HTML references
2. uploads the static site as a GitHub Pages artifact
3. deploys the artifact to the `github-pages` environment

## Evidence and Privacy

The case study is based on resume project history. Client names, source code, credentials, subscription identifiers, and environment-specific values are not published.
