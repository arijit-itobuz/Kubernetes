# Kubernetes

---

### General

- `kubectl config get-contexts`
- `kubectl get nodes`
- `kubectl get namespaces`
- `kubectl get pods` [--namespace=default]
- `kubectl get pods --namespace=<namesapce>`

---

### Pod

- `kubectl run nginx --image=nginx`
- `kubectl get pods -o wide`
- `kubectl describe pod nginx`
- `kubectl delete pod nginx`

---

### Deployment

- `kubectl create deployment nginx-deployment --image=nginx`
- `kubectl get deployments -o wide`
- `kubectl describe deployment nginx-deployment`
- `kubectl delete deployment nginx-deployment`
- `kubectl scale deployment nginx-deployment --replicas=5`

---

### Service

- `kubectl expose deployment nginx-deployment --port=8080 --target-port=80`
- `kubectl get services -o wide`
- `kubectl describe service nginx-deployment`
- `kubectl delete service nginx-deployment`
- `kubectl expose deployment nginx-deployment --type=NodePort --port=80`
  - [node: docker-desktop] > curl localhost:<mapped-port> [hostname name for docker-desktop is localhost as docker is not a vm; it uses system resources]

---
