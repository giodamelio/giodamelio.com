#!/bin/bash
printf "Removing old site... "
rm -r public/
echo -e "\t\tDone"

printf "Building Site... "
time=$(hugo | tail -n 1 | cut -d " " -f 2-3)
echo -e "\t\tDone (in $time)"

printf "Publishing to IPFS... "
hash=$(ipfs add -qr public/ | tail -n 1)
echo -e "\t\tDone"

printf "Adding to history... "
echo "$(date --rfc-3339=seconds),https://gateway.ipfs.io/ipfs/$hash" >> data/history.csv
echo -e "\t\tDone"

printf "Updating IPNS... "
peerid=$(ipfs name publish $hash | cut -d " " -f 3)
echo -e "\t\tDone"

T="$(printf '\t')"

# Print message
cat << EOF

-----------------
Publish sucessfull

IPFS hash:$T$T $hash
IPNS peerid:$T$T $peerid

IPFS:
  Local Gateway:$T http://localhost:8080/ipfs/$hash
  Internet Gateway:$T https://gateway.ipfs.io/ipfs/$hash

IPNS:
  Local Gateway:$T http://localhost:8080/ipns/$peerid
  Internet Gateway:$T https://gateway.ipfs.io/ipns/$peerid
EOF

