# Kubernetes Secrets

---

## Secrets Store CSI Driver

- `Secrets Store CSI Driver` [https://secrets-store-csi-driver.sigs.k8s.io]

- `helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts`
- `helm install csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver --namespace kube-system`
- `kubectl get crd -n kube-system`

- `aws/secrets-store-csi-driver-provider-aws` [https://github.com/aws/secrets-store-csi-driver-provider-aws]

- `kubectl apply -f https://raw.githubusercontent.com/aws/secrets-store-csi-driver-provider-aws/main/deployment/aws-provider-installer.yaml`

- _create iam policy for secret manager_
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetSecretValue",
                "secretsmanager:DescribeSecret"
            ],
            "Resource": "<secret_arn>"
        }
    ]
}

- `eksctl utils associate-iam-oidc-provider --profile snapee-test --region us-east-1 --cluster demo-eks --approve`
- `eksctl create iamserviceaccount --profile snapee-test --name api-sa --region us-east-1 --cluster demo-eks --attach-policy-arn arn:aws:iam::242201279177:policy/demo-csi-policy --approve --override-existing-serviceaccounts`
- `kubectl get serviceaccount`
- `kubectl describe sa api-sa`
- `kubectl apply -f ./kubernetes/secrets/secrets.yaml`
- `kubectl get secretproviderclass`
- `kubectl apply -f ./kubernetes/k8s.yaml -f ./kubernetes/nginx.yaml`
- ``

---