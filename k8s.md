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

##### NodePort

- `kubectl expose deployment k8s --type=NodePort --port=3001`
  - [node: docker-desktop]
    - `curl localhost:<mapped-port>`
    - hostname is _localhost_ as node is _docker_
    - port is the _mapped-port_

##### LoadBalancer

- `kubectl expose deployment k8s --type=LoadBalancer --port=3001`
  - [node: docker-desktop]
    - `curl localhost:<actual-port>`
    - hostname is _localhost_ as node is _docker_
    - port is the _actual-port_

---
