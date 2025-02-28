# Ingress

## General

- An Ingress Controller is a component in Kubernetes that manages external access to services within a cluster.
- It acts as a reverse proxy, routing requests from the internet to the appropriate services based on rules defined in an Ingress resource.

- 🚀 Popular Ingress Controllers

  - 🔹 AWS ALB Ingress Controller – Uses AWS Application Load Balancer (ALB).
  - 🔹 NGINX Ingress Controller – Popular for on-prem and cloud setups.
  - 🔹 Traefik – Lightweight and flexible.
  - 🔹 HAProxy – High-performance ingress.
  - 🔹 Kong – API gateway with advanced features.

- ⚡ Why Use an Ingress Controller?

  - ✅ Single Entry Point – Manage multiple services under one Load Balancer.
  - ✅ Path-Based Routing – Route traffic based on URLs (/api, /auth).
  - ✅ Host-Based Routing – Route traffic based on domains (api.example.com, app.example.com).
  - ✅ TLS Termination – Handle HTTPS using AWS ACM or other certificate providers.
  - ✅ Security & Authentication – Protect services with authentication and security rules.

---

## Commands

- `eksctl utils associate-iam-oidc-provider --profile snapee-devops-common --region us-east-1 --cluster demo-eks --approve`
- `curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.11.0/docs/install/iam_policy.json`
- `aws iam create-policy --profile snapee-devops-common --policy-name AWSLoadBalancerControllerIAMPolicyStaging --policy-document file://iam_policy.json`
- `eksctl create iamserviceaccount --profile snapee-devops-common --region us-east-1 --cluster demo-eks --namespace kube-system --name aws-load-balancer-controller --role-name AWSLoadBalancerControllerIAMPolicyStaging --attach-policy-arn arn:aws:iam::242201279177:policy/AWSLoadBalancerControllerIAMPolicyStaging --override-existing-serviceaccounts --approve`
- `helm repo add eks https://aws.github.io/eks-charts`
- `helm repo update`
- `helm upgrade --install aws-load-balancer-controller eks/aws-load-balancer-controller --set clusterName=demo-eks --set region=us-east-1 --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller -n kube-system`
- `kubectl get serviceaccount aws-load-balancer-controller -n kube-system -o yaml`
- `kubectl describe serviceaccount aws-load-balancer-controller -n kube-system`
- `kubectl get pods -n kube-system`

  ```
    kubectl apply -f "./kubernetes/ingress.yaml"
  ```

- `kubectl get ingress --all-namespaces`
- `kubectl describe ingress demo-ingress-http`
- `kubectl get ingress demo-ingress-http -o jsonpath="{.status.loadBalancer.ingress[0].hostname}"`

---

## AWS Load-Balancer

- ⚡ Classic Load Balancer (CLB)

  - Legacy load balancer (introduced first).
  - Operates at Layer 4 (TCP) and Layer 7 (HTTP/HTTPS).
  - Basic load balancing for both EC2-Classic and VPC.
  - Limitations: No advanced features like host-based or path-based routing.
  - Use Case: Simple, older applications or for backward compatibility.

- ⚡ Application Load Balancer (ALB)

  - Operates at Layer 7 (HTTP/HTTPS).
  - Supports **host-based** routing (route based on domain name) and **path-based** routing (e.g., /api vs /static).
  - Integrates with AWS services like ECS (Fargate), EKS (Kubernetes), and Lambda.
  - Supports WebSocket and gRPC protocols.
  - Use Case: Modern web applications, microservices, APIs that require advanced routing.

- ⚡ Network Load Balancer (NLB)

  - Operates at Layer 4 (TCP/UDP).
  - Designed for ultra-high performance and low latency.
  - Can handle millions of requests per second.
  - Supports static IPs or Elastic IPs and preserves the source IP of the client.
  - Use Case: Applications that need high performance, real-time data (e.g., gaming, financial services), or require fixed IPs.

- `ALB: If you’re hosting a web app with multiple services (e.g., /api and /static)`
- `NLB: For a real-time chat service requiring high throughput and low latency`
- `CLB: If you have an older application and don’t need advanced features`

- When we set up an Ingress Controller in EKS, it typically provisions an Application Load Balancer (ALB) by default.
- This is because ALBs are designed for Layer 7 (HTTP/HTTPS) traffic and offer features that align with Kubernetes Ingress resources

---
