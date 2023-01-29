#!/bin/bash

images=("client" "comments" "event-bus" "moderation" "posts" "query")

# build all images in parallel
for image in "${images[@]}"
do
    docker build -t "$image" "./$image" &
done

# wait for all builds to finish
wait

ports=(3000 4001 4005 4003 4000 4002)
network="mynetwork"

# run all images in parallel
for i in "${!images[@]}"
do
    docker run --name "${images[i]}" -p "${ports[i]}:${ports[i]}" --network "$network" "${images[i]}" &
done

# wait for all running images to finish
wait

# Stop building on the client and enter the shell of client
docker stop client
docker exec -it client sh
