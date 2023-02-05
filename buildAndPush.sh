#!/bin/bash

images=("client" "comments" "event-bus" "moderation" "posts" "query")

# build all images in parallel
for image in "${images[@]}"
do
    docker build -t "quemasandy/$image" "./$image" &
done
# wait for all builds to finish
wait

# push all images in parallel
for image in "${images[@]}"
do
    docker push "quemasandy/$image" &
done
# wait for all builds to finish
wait
