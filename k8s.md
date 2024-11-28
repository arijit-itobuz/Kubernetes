# Kubernetes

---

## General

- `kubectl config get-contexts`
- `kubectl get nodes`
- `kubectl get namespaces`
- `kubectl get pods` [--namespace=default]
- `kubectl get pods --namespace=<namesapce>`

---

## Pod

- `kubectl run nginx --image=nginx`
- `kubectl get pods -o wide`
- `kubectl describe pod nginx`
- `kubectl delete pod nginx`
- `kubectl exec <pod_name> -- <cmd>`

---

## Deployment

- `kubectl create deployment k8s --image=arijititobuz/kubernetes:1.0.0`
- `kubectl get deployments -o wide`
- `kubectl describe deployment k8s`
- `kubectl delete deployment k8s`
- `kubectl scale deployment k8s --replicas=5`

---

## Service

- `kubectl expose deployment k8s --port=3001 --target-port=3001`
- `kubectl get services -o wide`
- `kubectl describe service k8s`
- `kubectl delete service k8s`

#### NodePort

- `kubectl expose deployment k8s --type=NodePort --port=3001`
  - [node: docker-desktop]
    - `curl localhost:<mapped-port>`
    - hostname is _localhost_ as node is _docker_
    - port is the _mapped-port_

#### LoadBalancer

- `kubectl expose deployment k8s --type=LoadBalancer --port=3001`
  - [node: docker-desktop]
    - `curl localhost:<actual-port>`
    - hostname is _localhost_ as node is _docker_
    - port is the _actual-port_

---

## Rolling Update

- `kubectl get deployment k8s -o yaml`
- `kubectl set image deployment k8s kubernetes=arijititobuz/kubernetes:1.0.1`
- `kubectl rollout status deploy k8s`

---

## YAML Config

- `kubectl apply -f ./kubernetes/k8s/deployment.yaml`
- `kubectl apply -f ./kubernetes/k8s/service.yaml`
- `kubectl delete -f ./kubernetes/k8s/deployment.yaml`
- `kubectl delete -f ./kubernetes/k8s/service.yaml`

- `kubectl apply -f ./kubernetes/k8s.yaml -f ./kubernetes/nginx.yaml`
- `kubectl delete -f ./kubernetes/k8s.yaml -f ./kubernetes/nginx.yaml`

---

## Cleanup

- `kubectl delete all --all`

---
