# Members Files Directory

This directory contains files that are available for download in the members-only area.

## Directory Structure

- **documents/** - PDFs, guides, documentation
- **images/** - Photos, diagrams, graphics
- **videos/** - Tutorial videos, recordings
- **resources/** - Templates, code, archives

## Adding Files

1. Place your file in the appropriate category folder
2. Update `files.json` with the file information
3. Members will see it on the `/members` page

See `MEMBER-FILES-GUIDE.md` in the project root for detailed instructions.

## Example Entry in files.json

```json
{
  "id": "1",
  "name": "Your File Name",
  "description": "What this file contains",
  "category": "documents",
  "filename": "actual-filename.pdf",
  "uploadDate": "2025-01-15",
  "size": "2.5 MB"
}
```

## Security Note

Files in this directory are accessible via direct URL. For true privacy, implement server-side authentication for file downloads.
