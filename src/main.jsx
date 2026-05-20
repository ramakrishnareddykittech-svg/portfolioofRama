import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  Award,
  BookOpenCheck,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Container,
  DatabaseZap,
  Download,
  ExternalLink,
  FileSearch,
  Github,
  GitBranch,
  Gauge,
  KeyRound,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Play,
  Radar,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  Workflow,
  Wrench
} from 'lucide-react';
import './styles.css';

const profile = {
  name: 'Ramakrishna Reddy',
  title: 'Azure DevOps & Cloud Engineer',
  location: 'India',
  email: 'your.email@example.com',
  photo: '/assets/profile-photo.jpg',
  headline: 'Cloud Incident War Room for Azure, AKS, Terraform, GitOps, and AIOps work.',
  summary:
    'A portfolio built like an engineering incident desk: failed pipelines, Kubernetes traffic checks, Terraform recovery, ArgoCD sync, Grafana alerts, and interview-ready proof.'
};

const scenarioImages = {
  commandCenter: '/assets/devops-command-center.png',
  incident: '/assets/incident-simulator.png',
  caseStudy: '/assets/case-study-board.png'
};

const architectureNodes = [
  { id: 'pipeline', label: 'Pipeline', detail: 'Azure DevOps CI/CD recovery', icon: Workflow },
  { id: 'aks', label: 'AKS', detail: 'Pods, services, endpoints, logs', icon: Container },
  { id: 'terraform', label: 'Terraform', detail: 'Plan, validate, module recovery', icon: ServerCog },
  { id: 'gitops', label: 'ArgoCD', detail: 'Sync status and rollout proof', icon: GitBranch },
  { id: 'grafana', label: 'Grafana', detail: 'Alert review and metric evidence', icon: Gauge },
  { id: 'security', label: 'Security', detail: 'Key Vault and runtime config checks', icon: ShieldCheck }
];

const fixStories = [
  {
    problem: 'Terraform apply failed while installing AKS add-ons',
    root: 'The Kubernetes provider tried to connect before the AKS cluster credentials and API endpoint were ready.',
    fix: 'Split the flow into cluster provisioning, credential refresh, and add-on bootstrap through a safer Terraform path.',
    result: 'ArgoCD and monitoring installation became repeatable instead of depending on manual kubectl steps.'
  },
  {
    problem: 'Frontend service was deployed but the app was not reachable',
    root: 'Service selectors, pod labels, and gateway routing needed to be checked together instead of guessing from one manifest.',
    fix: 'Verified pods, services, endpoints, and gateway logs before changing Kubernetes YAML.',
    result: 'The traffic path became clear: request, gateway, service, pod, and logs.'
  },
  {
    problem: 'Azure DevOps release failed during Web App deployment',
    root: 'The build stage produced an artifact shape that did not match what the deployment task expected.',
    fix: 'Aligned build output, artifact path, zip packaging, and deploy task input.',
    result: 'The release became easier to explain and easier to rerun after fixes.'
  }
];

const realWorldScenarios = [
  {
    title: 'Scenario 1: Pipeline fails after build succeeds',
    image: scenarioImages.caseStudy,
    situation: 'A build pipeline completes, but the release stage fails because the artifact path or package format is wrong.',
    checks: ['Open failed task logs', 'Check artifact name and path', 'Compare package format with deploy task', 'Rerun only after fixing contract'],
    proof: 'Shows practical CI/CD debugging, not just pipeline creation.'
  },
  {
    title: 'Scenario 2: AKS app is running but users cannot access it',
    image: scenarioImages.commandCenter,
    situation: 'Pods are Running, but the frontend still does not open from the browser.',
    checks: ['kubectl get pods,svc,endpoints', 'Check service selector labels', 'Read gateway logs', 'Validate ingress or load balancer path'],
    proof: 'Shows real Kubernetes troubleshooting from traffic entry to workload.'
  },
  {
    title: 'Scenario 3: Grafana alert needs root-cause review',
    image: scenarioImages.incident,
    situation: 'An alert fires for high CPU, failing health checks, or a restart loop after deployment.',
    checks: ['Open dashboard time range', 'Compare deployment time', 'Read pod logs', 'Decide rollback, scale, or config fix'],
    proof: 'Shows incident response thinking with monitoring evidence.'
  }
];

const terminalLines = [
  '$ terraform plan -var-file=dev.tfvars',
  'Plan: 9 to add, 0 to change, 0 to destroy',
  '$ az aks get-credentials --resource-group platform-rg --name aks-prod',
  '$ kubectl get pods,svc,endpoints -n boutique -o wide',
  'frontend   3/3 Running   service/frontend   10.0.34.12',
  '$ kubectl logs deploy/gateway --tail=80',
  'health check passed, upstream reachable'
];

const incidents = [
  {
    name: 'Pod CrashLoopBackOff',
    icon: Container,
    steps: ['Check restart count and last state', 'Read container logs', 'Inspect env and mounted secrets', 'Patch config and redeploy']
  },
  {
    name: 'Pipeline Failed',
    icon: Workflow,
    steps: ['Find failed task', 'Compare artifact path', 'Check service connection', 'Rerun with corrected input']
  },
  {
    name: 'Terraform Error',
    icon: Wrench,
    steps: ['Read exact provider error', 'Check state and lock', 'Run fmt and validate', 'Plan after fixing module wiring']
  },
  {
    name: 'High CPU Alert',
    icon: Activity,
    steps: ['Open Grafana panel', 'Compare pod metrics', 'Check recent release', 'Scale or rollback with notes']
  }
];

const skillMap = [
  { group: 'Cloud', icon: Cloud, items: ['Azure', 'AKS', 'ACR', 'App Service', 'Key Vault'] },
  { group: 'IaC', icon: ServerCog, items: ['Terraform', 'Bicep', 'Modules', 'Outputs', 'Validation'] },
  { group: 'CI/CD', icon: Workflow, items: ['Azure DevOps', 'GitHub Actions', 'GitLab CI', 'Release Gates'] },
  { group: 'GitOps', icon: GitBranch, items: ['ArgoCD', 'Helm', 'Kustomize', 'Sync Debugging'] },
  { group: 'Observability', icon: Radar, items: ['Grafana', 'Prometheus', 'Azure Monitor', 'Logs'] },
  { group: 'App Stack', icon: Code2, items: ['Java', 'React', 'Docker', 'PowerShell', 'YAML'] }
];

const projects = [
  {
    title: 'AKS GitOps Boutique Platform',
    outcome: 'Production-style rollout',
    score: 94,
    tags: ['AKS', 'ArgoCD', 'Helm', 'Kustomize'],
    story: 'A Kubernetes platform flow that keeps app deployment, GitOps sync, and runtime debugging connected.',
    impact: ['Automation', 'Monitoring', 'Security', 'GitOps'],
    problem: 'Application deployed to AKS, but traffic and GitOps sync needed a clean validation path.',
    rootCause: 'The runtime path spans manifests, services, gateway routing, and ArgoCD state.',
    commands: ['kubectl get pods,svc,endpoints -n boutique -o wide', 'kubectl logs deployment/gateway --tail=80', 'argocd app sync boutique'],
    fixApplied: 'Checked traffic from gateway to service to pod, then aligned GitOps sync and rollout validation.',
    finalProof: 'Pods healthy, service endpoints present, gateway logs clean, and ArgoCD sync green.',
    interviewPoints: ['I debug Kubernetes from traffic path first.', 'I verify live cluster state before editing YAML.', 'I use GitOps sync as proof, not just deployment intent.'],
    deepDive: ['Architecture: app, gateway, services, ingress', 'Challenge: sync and CRD ordering', 'Proof: kubectl and ArgoCD checks']
  },
  {
    title: 'Terraform Azure Foundation',
    outcome: 'Repeatable infrastructure',
    score: 91,
    tags: ['Terraform', 'Azure', 'Modules', 'Outputs'],
    story: 'Reusable Azure infrastructure with module wiring, validation, outputs, and environment separation.',
    impact: ['IaC', 'Cost Control', 'Security', 'Validation'],
    problem: 'Terraform failed when infrastructure and cluster add-ons were handled in one fragile flow.',
    rootCause: 'Provider ordering and cluster credential readiness created failures before add-ons could install.',
    commands: ['terraform fmt -recursive', 'terraform init -backend=false', 'terraform validate', 'terraform plan -var-file=dev.tfvars'],
    fixApplied: 'Separated cluster creation, credential refresh, add-on bootstrap, outputs, and validation.',
    finalProof: 'Plan path became readable, repeatable, and easier to recover after a failed apply.',
    interviewPoints: ['I do validation before apply.', 'I separate infrastructure creation from cluster add-ons.', 'I expose outputs that make post-deploy checks easier.'],
    deepDive: ['Architecture: root plus child modules', 'Challenge: provider ordering', 'Proof: fmt, init, validate, plan']
  },
  {
    title: 'AIOps Monitoring Workflow',
    outcome: 'Faster incident review',
    score: 88,
    tags: ['Grafana', 'Prometheus', 'Alerts', 'Runbooks'],
    story: 'Monitoring design that turns metrics, logs, and alerts into a clear troubleshooting path.',
    impact: ['Observability', 'Runbooks', 'SLO', 'Alerts'],
    problem: 'Alerts existed, but the response path needed to connect dashboards, logs, and recent deploys.',
    rootCause: 'Metrics alone do not explain whether the issue is deployment, config, traffic, or resource pressure.',
    commands: ['kubectl top pods -n boutique', 'kubectl logs deployment/frontend --tail=120', 'kubectl rollout history deployment/frontend'],
    fixApplied: 'Built a step-by-step alert review flow: dashboard time range, pod health, logs, deployment history, and action.',
    finalProof: 'Incident review explains what happened, when it started, and what action was taken.',
    interviewPoints: ['I connect alerts to release timing.', 'I avoid guessing from one graph.', 'I document the exact recovery path.'],
    deepDive: ['Architecture: metrics, logs, dashboards', 'Challenge: noisy alerts', 'Proof: panel and command checks']
  },
  {
    title: 'Azure DevOps Package Fix',
    outcome: 'Pipeline reliability',
    score: 86,
    tags: ['Azure DevOps', 'Artifacts', 'Web App', 'CI/CD'],
    story: 'A build-and-release correction that aligns package creation with the deployment task.',
    impact: ['CI/CD', 'Quality Gate', 'Automation', 'Release'],
    problem: 'Build succeeded but the release failed because the deployment task could not use the artifact correctly.',
    rootCause: 'The package format and artifact path did not match the deploy task contract.',
    commands: ['dotnet publish --configuration Release', 'ls $(Pipeline.Workspace)', 'AzureWebApp package: $(Pipeline.Workspace)/**/*.zip'],
    fixApplied: 'Aligned publish output, zip packaging, artifact upload, and deployment task input.',
    finalProof: 'The release task consumed the artifact without late-stage package errors.',
    interviewPoints: ['I inspect artifact contracts, not only task names.', 'I fix the build output and deploy input together.', 'I call out the next pipeline failure before it happens.'],
    deepDive: ['Architecture: build, artifact, deploy', 'Challenge: package mismatch', 'Proof: successful artifact contract']
  }
];

const roleViews = {
  'Azure DevOps Engineer': ['Azure DevOps Package Fix', 'Terraform Azure Foundation', 'AKS GitOps Boutique Platform'],
  'Kubernetes Platform Engineer': ['AKS GitOps Boutique Platform', 'AIOps Monitoring Workflow', 'Terraform Azure Foundation'],
  'Cloud Engineer': ['Terraform Azure Foundation', 'AIOps Monitoring Workflow', 'Azure DevOps Package Fix']
};

const timeline = ['Code', 'Docker', 'Pipeline', 'Terraform', 'AKS', 'ArgoCD', 'Grafana'];

const playbooks = [
  'Debug AKS service issue with pods, services, endpoints, and logs',
  'Fix Terraform provider and module errors with validation-first flow',
  'Investigate failed Azure DevOps release from task logs to artifact contract',
  'Review Grafana alert by checking metric source, deployment time, and pod health'
];

const warRoomLanes = [
  {
    name: 'Pipeline',
    state: 'Recovered',
    icon: Workflow,
    image: scenarioImages.caseStudy,
    signal: 'Release failed after build success',
    command: 'AzureWebApp package: **/*.zip',
    action: 'Aligned artifact path and package format'
  },
  {
    name: 'Terraform',
    state: 'Validated',
    icon: ServerCog,
    image: scenarioImages.caseStudy,
    signal: 'AKS add-ons blocked by provider timing',
    command: 'terraform validate && terraform plan',
    action: 'Separated cluster build from add-on bootstrap'
  },
  {
    name: 'AKS',
    state: 'Deployed',
    icon: Container,
    image: scenarioImages.commandCenter,
    signal: 'Service running but browser path failed',
    command: 'kubectl get pods,svc,endpoints',
    action: 'Traced gateway, service, endpoint, pod logs'
  },
  {
    name: 'ArgoCD',
    state: 'Synced',
    icon: GitBranch,
    image: scenarioImages.commandCenter,
    signal: 'Git desired state needed cluster proof',
    command: 'argocd app sync boutique',
    action: 'Verified app sync and rollout health'
  },
  {
    name: 'Grafana',
    state: 'Monitored',
    icon: Gauge,
    image: scenarioImages.incident,
    signal: 'Alert fired after deployment window',
    command: 'kubectl logs --tail=120',
    action: 'Matched alert time, logs, rollout history'
  },
  {
    name: 'Security',
    state: 'Checked',
    icon: ShieldCheck,
    image: scenarioImages.incident,
    signal: 'Secrets and runtime config required review',
    command: 'kubectl describe secret / key vault ref',
    action: 'Confirmed secret path and access pattern'
  }
];

const resolutionSteps = ['Alert detected', 'Evidence collected', 'Root cause isolated', 'Fix applied', 'Health verified', 'Interview notes ready'];

const viewModeCopy = {
  Recruiter: {
    label: 'Recruiter View',
    intro: 'Focuses on business impact, reliability, delivery confidence, and role fit.'
  },
  Engineer: {
    label: 'Engineer View',
    intro: 'Shows commands, logs, YAML/Terraform/Kubernetes checks, and final proof.'
  },
  Interview: {
    label: 'Interview View',
    intro: 'Turns each project into short speaking points for technical interviews.'
  }
};

function App() {
  const [activeNode, setActiveNode] = useState(architectureNodes[0]);
  const [activeIncident, setActiveIncident] = useState(incidents[0]);
  const [activeRole, setActiveRole] = useState(Object.keys(roleViews)[0]);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [viewMode, setViewMode] = useState('Engineer');

  const roleProjects = useMemo(
    () => projects.filter((project) => roleViews[activeRole].includes(project.title)),
    [activeRole]
  );

  return (
    <div className="app">
      <Header />
      <main>
        <Hero activeNode={activeNode} setActiveNode={setActiveNode} />
        <EvidenceShowcase />
        <FixStories />
        <RealWorldScenarios />
        <WarRoom viewMode={viewMode} setViewMode={setViewMode} />
        <TerminalWalkthrough />
        <IncidentSimulator activeIncident={activeIncident} setActiveIncident={setActiveIncident} />
        <SkillMap />
        <ProjectImpact activeProject={activeProject} setActiveProject={setActiveProject} viewMode={viewMode} setViewMode={setViewMode} />
        <RoleFit activeRole={activeRole} setActiveRole={setActiveRole} roleProjects={roleProjects} />
        <DeploymentTimeline />
        <Playbook />
        <ProjectDeepDive activeProject={activeProject} setActiveProject={setActiveProject} />
        <Contact />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Portfolio home">
        <span className="brand-mark"><Cloud size={21} /></span>
        <span>
          <strong>{profile.name}</strong>
          <small>Cloud Incident War Room</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#war-room">War Room</a>
        <a href="#stories">Fix Stories</a>
        <a href="#incident">Simulator</a>
        <a href="#projects">Tickets</a>
        <a href="#role-fit">Role Fit</a>
      </nav>
      <a className="header-resume" href="/assets/resume.pdf" target="_blank" rel="noreferrer">
        <Download size={17} /> Resume
      </a>
    </header>
  );
}

function Hero({ activeNode, setActiveNode }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <ProfileChip />
        <h1>{profile.headline}</h1>
        <p>{profile.summary}</p>
        <div className="hero-actions">
          <a className="primary-button" href="#war-room">
            Open War Room <ArrowRight size={18} />
          </a>
          <a className="secondary-button" href="#incident">
            Try incident simulator <Play size={17} />
          </a>
        </div>
        <div className="hero-metrics" aria-label="Portfolio metrics">
          <Metric value="6" label="live status lanes" />
          <Metric value="4" label="incident tickets" />
          <Metric value="3" label="audience views" />
        </div>
      </div>
      <CloudMap activeNode={activeNode} setActiveNode={setActiveNode} />
    </section>
  );
}

function ProfileChip() {
  return (
    <div className="profile-chip">
      <img src={profile.photo} alt={`${profile.name} profile`} />
      <span>
        <strong>{profile.name}</strong>
        <small><MapPin size={13} /> {profile.title} - {profile.location}</small>
      </span>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <span>
      <strong>{value}</strong>
      {label}
    </span>
  );
}

function CloudMap({ activeNode, setActiveNode }) {
  return (
    <section className="cloud-map" aria-label="Interactive cloud incident dashboard">
      <div className="map-header">
        <span><Activity size={17} /> Cloud incident board</span>
        <strong>Recovered</strong>
      </div>
      <div className="map-grid war-map-grid">
        {architectureNodes.map((node) => {
          const Icon = node.icon;
          return (
            <button
              type="button"
              key={node.id}
              className={activeNode.id === node.id ? 'map-node active' : 'map-node'}
              onClick={() => setActiveNode(node)}
            >
              <Icon size={22} />
              <span>{node.label}</span>
            </button>
          );
        })}
      </div>
      <div className="node-detail">
        <span>Selected lane</span>
        <h2>{activeNode.label}</h2>
        <p>{activeNode.detail}</p>
        <div className="node-checks">
          <small><CheckCircle2 size={15} /> Validated</small>
          <small><CheckCircle2 size={15} /> Deployed</small>
          <small><CheckCircle2 size={15} /> Monitored</small>
          <small><CheckCircle2 size={15} /> Recovered</small>
        </div>
      </div>
    </section>
  );
}

function EvidenceShowcase() {
  return (
    <section className="evidence-showcase" aria-label="Real project evidence preview">
      <div className="evidence-copy">
        <SectionHeading
          icon={ShieldCheck}
          title="Built like real project evidence"
          text="The design presents work the way an interviewer expects to discuss it: issue, command, screenshot, root cause, and final proof."
        />
        <div className="evidence-points">
          <article><strong>Pipeline evidence</strong><span>Build logs, artifact paths, deployment task inputs.</span></article>
          <article><strong>Kubernetes evidence</strong><span>Pods, services, endpoints, gateway logs, rollout status.</span></article>
          <article><strong>Terraform evidence</strong><span>fmt, validate, plan, state checks, provider behavior.</span></article>
        </div>
      </div>
      <figure className="evidence-image">
        <img src={scenarioImages.commandCenter} alt="DevOps command center visual showing cloud delivery and monitoring panels" />
      </figure>
    </section>
  );
}

function FixStories() {
  return (
    <section className="section" id="stories">
      <SectionHeading
        icon={FileSearch}
        title="Before vs after DevOps fix stories"
        text="Instead of only listing tools, this section shows how an issue was diagnosed, fixed, and improved."
      />
      <div className="story-grid">
        {fixStories.map((story) => (
          <article className="story-card" key={story.problem}>
            <span>Problem</span>
            <h3>{story.problem}</h3>
            <dl>
              <div><dt>Root cause</dt><dd>{story.root}</dd></div>
              <div><dt>Fix</dt><dd>{story.fix}</dd></div>
              <div><dt>Result</dt><dd>{story.result}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function RealWorldScenarios() {
  return (
    <section className="section realistic-section">
      <SectionHeading
        icon={Radar}
        title="Real-world scenario based portfolio"
        text="These sections are designed around situations you may actually explain in interviews or project reviews."
      />
      <div className="scenario-grid">
        {realWorldScenarios.map((scenario) => (
          <article className="scenario-card" key={scenario.title}>
            <img src={scenario.image} alt={`${scenario.title} dashboard visual`} />
            <div className="scenario-body">
              <h3>{scenario.title}</h3>
              <p>{scenario.situation}</p>
              <strong>What I check</strong>
              <ul>
                {scenario.checks.map((check) => <li key={check}>{check}</li>)}
              </ul>
              <span>{scenario.proof}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WarRoom({ viewMode, setViewMode }) {
  return (
    <section className="war-room" id="war-room">
      <div className="war-room-header">
        <SectionHeading
          icon={Activity}
          title="DevOps War Room"
          text="A realistic command center that turns the portfolio into incident lanes, evidence panels, recovery proof, and interview-ready context."
        />
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className="war-room-grid">
        {warRoomLanes.map((lane) => <IncidentLane key={lane.name} lane={lane} />)}
      </div>
      <ResolutionTimeline />
    </section>
  );
}

function ViewModeToggle({ viewMode, setViewMode }) {
  return (
    <div className="view-mode-card">
      <span>Audience mode</span>
      <div className="view-mode-toggle" role="tablist" aria-label="Portfolio view mode">
        {Object.keys(viewModeCopy).map((mode) => (
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === mode}
            className={viewMode === mode ? 'active' : ''}
            key={mode}
            onClick={() => setViewMode(mode)}
          >
            {mode}
          </button>
        ))}
      </div>
      <p>{viewModeCopy[viewMode].intro}</p>
    </div>
  );
}

function IncidentLane({ lane }) {
  const Icon = lane.icon;
  return (
    <article className="incident-lane">
      <img src={lane.image} alt={`${lane.name} evidence panel`} />
      <div className="lane-body">
        <div className="lane-title">
          <Icon size={21} />
          <strong>{lane.name}</strong>
          <span>{lane.state}</span>
        </div>
        <p>{lane.signal}</p>
        <CommandEvidence command={lane.command} />
        <small>{lane.action}</small>
      </div>
    </article>
  );
}

function CommandEvidence({ command }) {
  return (
    <code className="command-evidence">{command}</code>
  );
}

function ResolutionTimeline() {
  return (
    <div className="resolution-timeline" aria-label="Incident resolution timeline">
      {resolutionSteps.map((step, index) => (
        <div className="resolution-step" key={step}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}

function TerminalWalkthrough() {
  return (
    <section className="terminal-band">
      <div>
        <SectionHeading
          icon={TerminalSquare}
          title="Terminal style walkthrough"
          text="A recruiter or interviewer can see the actual troubleshooting flow: validate, connect, inspect, read logs, and confirm health."
        />
      </div>
      <div className="terminal-window" aria-label="Terminal command walkthrough">
        <div className="terminal-top"><span /> <span /> <span /></div>
        <pre>{terminalLines.join('\n')}</pre>
      </div>
    </section>
  );
}

function IncidentSimulator({ activeIncident, setActiveIncident }) {
  return (
    <section className="section incident-section" id="incident">
      <SectionHeading
        icon={BrainCircuit}
        title="AIOps incident simulator"
        text="Choose an incident and the portfolio shows the troubleshooting sequence I would follow."
      />
      <div className="incident-layout">
        <div className="incident-tabs">
          {incidents.map((incident) => {
            const Icon = incident.icon;
            return (
              <button
                type="button"
                key={incident.name}
                className={activeIncident.name === incident.name ? 'active' : ''}
                onClick={() => setActiveIncident(incident)}
              >
                <Icon size={19} /> {incident.name}
              </button>
            );
          })}
        </div>
        <article className="incident-panel">
          <h3>{activeIncident.name}</h3>
          <ol>
            {activeIncident.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </article>
      </div>
    </section>
  );
}

function SkillMap() {
  return (
    <section className="section">
      <SectionHeading
        icon={Network}
        title="Skill map"
        text="Skills are grouped by how they are used in delivery, not as one long keyword list."
      />
      <div className="skill-map">
        {skillMap.map((skill) => {
          const Icon = skill.icon;
          return (
            <article className="skill-card" key={skill.group}>
              <Icon size={24} />
              <h3>{skill.group}</h3>
              <div className="tag-list">
                {skill.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectImpact({ activeProject, setActiveProject, viewMode, setViewMode }) {
  return (
    <section className="section impact-section" id="projects">
      <div className="ticket-heading">
        <SectionHeading
          icon={Gauge}
          title="Incident and project tickets"
          text="Each project is presented as a real ticket: problem, root cause, commands checked, fix applied, and final proof."
        />
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className="ticket-board">
        {projects.map((project) => (
          <IncidentTicket
            key={project.title}
            project={project}
            active={activeProject.title === project.title}
            viewMode={viewMode}
            onSelect={() => setActiveProject(project)}
          />
        ))}
      </div>
    </section>
  );
}

function IncidentTicket({ project, active, viewMode, onSelect }) {
  return (
    <button type="button" className={active ? 'incident-ticket active' : 'incident-ticket'} onClick={onSelect}>
      <div className="ticket-top">
        <span>{project.outcome}</span>
        <strong>{project.score}</strong>
      </div>
      <h3>{project.title}</h3>
      <dl>
        <div><dt>Problem</dt><dd>{project.problem}</dd></div>
        <div><dt>Root Cause</dt><dd>{project.rootCause}</dd></div>
        {viewMode === 'Recruiter' && <div><dt>Business Value</dt><dd>{project.story}</dd></div>}
        {viewMode === 'Engineer' && (
          <div>
            <dt>Commands Checked</dt>
            <dd className="command-list">{project.commands.map((command) => <code key={command}>{command}</code>)}</dd>
          </div>
        )}
        {viewMode === 'Interview' && (
          <div>
            <dt>Speaking Points</dt>
            <dd>{project.interviewPoints.join(' ')}</dd>
          </div>
        )}
        <div><dt>Fix Applied</dt><dd>{project.fixApplied}</dd></div>
        <div><dt>Final Proof</dt><dd>{project.finalProof}</dd></div>
      </dl>
      <div className="impact-tags">
        {project.impact.map((tag) => <small key={tag}>{tag}</small>)}
      </div>
    </button>
  );
}

function RoleFit({ activeRole, setActiveRole, roleProjects }) {
  return (
    <section className="section role-section" id="role-fit">
      <SectionHeading
        icon={BriefcaseBusiness}
        title="Resume and portfolio role fit"
        text="Visitors can switch the portfolio view based on the role they are hiring for."
      />
      <div className="role-tabs">
        {Object.keys(roleViews).map((role) => (
          <button
            type="button"
            key={role}
            className={activeRole === role ? 'active' : ''}
            onClick={() => setActiveRole(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="role-results">
        {roleProjects.map((project) => (
          <article key={project.title}>
            <Award size={22} />
            <span>{project.outcome}</span>
            <h3>{project.title}</h3>
            <p>{project.tags.join(' - ')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeploymentTimeline() {
  return (
    <section className="section">
      <SectionHeading
        icon={Layers3}
        title="Real deployment timeline"
        text="The main workflow is visible as a delivery timeline from code to monitoring."
      />
      <div className="deployment-timeline">
        {timeline.map((item, index) => (
          <div className="timeline-step" key={item}>
            <span>{index + 1}</span>
            <strong>{item}</strong>
            {index < timeline.length - 1 && <ChevronRight size={20} />}
          </div>
        ))}
      </div>
    </section>
  );
}

function Playbook() {
  return (
    <section className="section playbook-section">
      <SectionHeading
        icon={BookOpenCheck}
        title="Troubleshooting playbook"
        text="Short runbook entries make the portfolio useful during interviews because they show how I think."
      />
      <div className="playbook-list">
        {playbooks.map((item) => (
          <article key={item}>
            <ShieldCheck size={21} />
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectDeepDive({ activeProject, setActiveProject }) {
  return (
    <section className="section deep-dive">
      <SectionHeading
        icon={DatabaseZap}
        title="One-click project deep dive"
        text="Click a project and the page shows architecture, challenge, proof, and useful tags."
      />
      <div className="deep-layout">
        <div className="deep-list">
          {projects.map((project) => (
            <button
              type="button"
              key={project.title}
              className={activeProject.title === project.title ? 'active' : ''}
              onClick={() => setActiveProject(project)}
            >
              {project.title}
            </button>
          ))}
        </div>
        <article className="deep-panel">
          <span>{activeProject.outcome}</span>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.story}</p>
          <ul>
            {activeProject.deepDive.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="tag-list">
            {activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact-section">
      <div>
        <ProfileChip />
        <h2>Ready for Azure DevOps, Kubernetes, and Cloud Engineer roles.</h2>
        <p>Use this portfolio as a project walkthrough during interviews, not just a static resume page.</p>
      </div>
      <div className="contact-actions">
        <a href={`mailto:${profile.email}`}><Mail size={18} /> Email</a>
        <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ExternalLink size={14} /></a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ExternalLink size={14} /></a>
        <a href="/assets/resume.pdf" target="_blank" rel="noreferrer"><Download size={18} /> Resume</a>
      </div>
    </footer>
  );
}

function SectionHeading({ icon: Icon, title, text }) {
  return (
    <div className="section-heading">
      <span><Icon size={20} /></span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
