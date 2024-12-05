# EKSCTL

---

## Commands

- `eksctl version`
- `eksctl create cluster --profile <aws_profile> --region <aws_region> -n <cluster_name> --nodegroup-name <node_group_name> --node-type t2.micro --nodes 2`
- `eksctl delete cluster --profile <aws_profile> --region <aws_region> -n <cluster_name>`

eksctl create cluster \
--profile snapee-test \
--region us-east-1 \
--name demo-eks \
--nodegroup-name demo-worker-nodes \
--node-type t3.medium \
--nodes 5 \
--nodes-min 1 \
--nodes-max 6 \
--managed
