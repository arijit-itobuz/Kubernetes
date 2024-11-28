# Kubernetes

## Setup

- npm i [node 22+]

- docker login
- docker image build -t <account_id>/<image_name>:<image_tag> -f ./docker/Dockerfile ./
- docker push <account_id>/<image_name>:<image_tag>

- brew install helm
- helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard --create-namespace --namespace kubernetes-dashboard
- kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443
- kubectl -n kubernetes-dashboard get serviceaccounts
- kubectl -n kubernetes-dashboard create token <service_account>
- https://localhost:8443

- _follow kubernetes from here_
