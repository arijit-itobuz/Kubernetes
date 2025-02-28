# Dashboard

---

## Grafana and Prometheus

#### Setup

- `helm repo add stable https://charts.helm.sh/stable`
- `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
- `kubectl create namespace monitoring`
- `helm install stable prometheus-community/kube-prometheus-stack -n monitoring`
- `kubectl get services -n monitoring -o wide`
- `export EDITOR=nano`
- `kubectl edit service stable-kube-prometheus-sta-prometheus -n monitoring` [edit **type** from **ClusterIP** to **LoadBalancer**]
- `kubectl edit service stable-grafana -n monitoring` [edit **type** from **ClusterIP** to **LoadBalancer**]
- `kubectl get secret -n monitoring stable-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo`
  ***
- _Grafana user name = admin; password = prom-operator_
- _Prometheus url = http://<LoadBalancer_Url>:9090/_
- _Grafana url = http://<LoadBalancer_Url>:80/_
  ***

---

## Kubernetes Dashboard

---
