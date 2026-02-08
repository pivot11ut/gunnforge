#!/bin/bash
# add--file.sh

FILENAME=$1
CATEGORY=$2
NAME=$3
DESCRIPTION=$4

if [ -z "$FILENAME" ] || [ -z "$CATEGORY" ]; then
  echo "Usage: ./add-file.sh <file> <category> <name> <description>"
  exit 1
fi

# Copy file
cp "$FILENAME" "public/members-files/$CATEGORY/"

# Get file size
SIZE=$(du -h "public/members-files/$CATEGORY/$(basename $FILENAME)" | cut -f1)

# Get date
DATE=$(date +%Y-%m-%d)

echo "File added! Now update files.json with:"
echo "{"
echo "  \"id\": \"X\","
echo "  \"name\": \"$NAME\","
echo "  \"description\": \"$DESCRIPTION\","
echo "  \"category\": \"$CATEGORY\","
echo "  \"filename\": \"$(basename $FILENAME)\","
echo "  \"uploadDate\": \"$DATE\","
echo "  \"size\": \"$SIZE\""
echo "}"
```
