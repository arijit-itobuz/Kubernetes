# Kubernetes

- `kubectl config get-contexts`
- `kubectl get nodes`
- `kubectl get namespaces`
- `kubectl get pods` [--namespace=default]
- `kubectl get pods --namespace=<namesapce>`

---

- `kubectl run nginx --image=nginx`
- `kubectl get pods -o wide`
- `kubectl describe pod nginx`
- `kubectl delete pod nginx`

---

- `kubectl create deployment nginx-deployment --image=nginx`
- `kubectl get deployments -o wide`
- `kubectl describe deployment nginx-deployment`
- `kubectl delete deployment nginx-deployment`
- `kubectl scale deployment nginx-deployment --replicas=5`

---

- `kubectl expose deployment nginx-deployment --port=8080 --target-port=80`
- `kubectl get services -o wide`
- `kubectl describe service nginx-deployment`
- `kubectl delete service nginx-deployment`
