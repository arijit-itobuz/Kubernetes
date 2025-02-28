# Kubernetes Secrets

---

## Secrets Store CSI Driver

- **Secrets Store CSI Driver** [https://secrets-store-csi-driver.sigs.k8s.io]
- `helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts`
- `helm install csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver --namespace kube-system`
- `helm upgrade -n kube-system csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver --set syncSecret.enabled=true --set enableSecretRotation=true --set rotationPollInterval=5m` [_s (seconds), m (minutes), h (hours) are supported._]
- `kubectl get crd -n kube-system`
  ***
- **aws/secrets-store-csi-driver-provider-aws** [https://github.com/aws/secrets-store-csi-driver-provider-aws]
- `kubectl apply -f https://raw.githubusercontent.com/aws/secrets-store-csi-driver-provider-aws/main/deployment/aws-provider-installer.yaml`
- _create iam policy for secret manager, if not created (one time process)_
  ```
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
  ```
- `eksctl utils associate-iam-oidc-provider --profile snapee-test --region us-east-1 --cluster demo-eks --approve`
- `eksctl create iamserviceaccount --profile snapee-test --name demo-aws-secret-sa --region us-east-1 --cluster demo-eks --attach-policy-arn arn:aws:iam::242201279177:policy/demo-csi-policy --approve --override-existing-serviceaccounts`
  ***
- `kubectl get csidrivers`
- `kubectl get serviceaccount`
- `kubectl describe sa demo-aws-secret-sa`
- `kubectl apply -f ./kubernetes/k8s/secrets.yaml -f ./kubernetes/kubes/secrets.yaml`
- `kubectl get secretproviderclass`
- `kubectl apply -f ./kubernetes/redis/deployment_service.yaml -f ./kubernetes/nginx/deployment_service.yaml -f ./kubernetes/k8s/deployment_service.yaml -f ./kubernetes/kubes/deployment_service.yaml`
- `kubectl get deployments -o wide`
- `kubectl get services -o wide`
- `kubectl rollout restart deployment <app | service>`
  ***

---
