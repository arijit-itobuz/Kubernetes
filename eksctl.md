# EKSCTL

---

## Commands

- `eksctl version`
- `eksctl create cluster --profile <aws_profile> --region <aws_region> -n <cluster_name> --nodegroup-name <node_group_name> --node-type t2.micro --nodes 2`
- `eksctl get cluster --profile <aws_profile> --name demo-eks --region us-east-1`
- `aws eks update-kubeconfig --profile <aws_profile> --region <aws_region> --name <cluster_name>`
- `eksctl delete cluster --profile <aws_profile> --region <aws_region> -n <cluster_name>`
  ***
  ```
  eksctl create cluster \
  --profile snapee-devops-common \
  --region us-east-1 \
  --name demo-eks \
  --nodegroup-name demo-eks-worker-nodes \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 5 \
  --managed
  ```
  ***
