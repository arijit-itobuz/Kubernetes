# Kubernetes

---

## General

- ``

---

## Config

- `kubectl config get-contexts`
- `kubectl config use-context <context-name>`
- `kubectl config current-context`
- `kubectl config delete-context <context_name>`
- `kubectl config get-users`
- `kubectl config delete-user <user_name>`

---

## Namespace

- `kubectl get namespaces`

---

## Node

- `kubectl get nodes -o wide`

---

## Pod

- `kubectl get pods` [--namespace=default]
- `kubectl get pods --namespace=<namesapce>`
  ***
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

## Rollout

- `kubectl get deployment k8s -o yaml`
- `kubectl set image deployment k8s kubernetes=arijititobuz/kubernetes:1.0.1`
- `kubectl rollout status deployment k8s`
- `kubectl rollout restart deployment k8s`
- `kubectl rollout history deployment k8s`
- `kubectl rollout history deployment k8s --revision=1`
- `kubectl rollout undo deployment k8s --to-revision=1`

---

## Replica Set

- `kubectl get replicaset`

---

## Logs

- `kubectl logs -l app=<app | service> --tail=100 -f`

---

## Exec

- `kubectl exec -it <pod_name> -- sh`

---

## YAML Config

- `kubectl apply -f ./kubernetes/nginx/deployment_service.yaml`
- `kubectl delete -f ./kubernetes/nginx/deployment_service.yaml`
  ***
- `kubectl apply -f ./kubernetes/nginx/deployment_service.yaml -f ./kubernetes/redis/deployment_service.yaml -f ./kubernetes/k8s/deployment_service.yaml -f ./kubernetes/kubes/deployment_service.yaml`
- `kubectl delete -f ./kubernetes/nginx/deployment_service.yaml -f ./kubernetes/redis/deployment_service.yaml -f ./kubernetes/k8s/deployment_service.yaml -f ./kubernetes/kubes/deployment_service.yaml`

---

## Cleanup

- `kubectl delete all --all`

---
