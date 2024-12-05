# EKSCTL

---

## Commands

- `eksctl version`
- `eksctl create cluster --profile <aws_profile> --region <aws_region> -n <cluster_name> --nodegroup-name <node_group_name> --node-type t2.micro --nodes 2`
- `eksctl delete cluster --profile <aws_profile> --region <aws_region> -n <cluster_name>`

eksctl create cluster \
--profile snapee-test \
--region us-east-1 \
--name leadhawk-eks \
--nodegroup-name leadhawk-eks-workers \
--node-type t3.micro \
--nodes 3 \
--nodes-min 1 \
--nodes-max 4 \
--managed
