#!/bin/bash

for pod in $(kubectl get pods -o name); do
  echo "===== $pod logs ===="
  kubectl logs $pod -f &
done
