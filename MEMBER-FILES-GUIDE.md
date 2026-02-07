# Member Files Management Guide

Complete guide for uploading and managing files in the members-only area.

## 📁 File Structure

Files are stored in the `public/members-files/` directory:

```
public/members-files/
├── documents/          # PDFs, docs, text files
├── images/            # Photos, diagrams, graphics
├── videos/            # Video tutorials, recordings
├── resources/         # Templates, code, archives
└── files.json         # File index (tracks all files)
```

## 🚀 Quick Start: Adding Your First File

### Step 1: Place Your File

Copy your file to the appropriate category folder:

```bash
# Example: Adding a PDF guide
cp ~/Downloads/guide.pdf public/members-files/documents/

# Example: Adding a template pack
cp ~/Downloads/templates.zip public/members-files/resources/

# Example: Adding a tutorial video
cp ~/Downloads/tutorial.mp4 public/members-files/videos/
```

### Step 2: Update the File Index

Edit `public/members-files/files.json` and add your file:

```json
{
  "files": [
    {
      "id": "1",
      "name": "Getting Started Guide",
      "description": "Complete guide to using GunnForge",
      "category": "documents",
      "filename": "guide.pdf",
      "uploadDate": "2025-01-15",
      "size": "2.5 MB"
    },
    {
      "id": "2",
      "name": "New File Name Here",
      "description": "Description of what this file contains",
      "category": "documents",
      "filename": "your-file.pdf",
      "uploadDate": "2025-01-20",
      "size": "1.2 MB"
    }
  ]
}
```

### Step 3: Test the Download

1. Visit: `http://localhost:3000/members` (must be logged in)
2. You should see your file listed
3. Click "Download" to test

## 📋 File Entry Fields

Each file in `files.json` needs these fields:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier | `"3"` |
| `name` | string | Display name | `"Project Templates"` |
| `description` | string | What the file contains | `"CAD templates for woodworking"` |
| `category` | string | Folder name | `"documents"`, `"resources"`, etc. |
| `filename` | string | Actual filename | `"templates.zip"` |
| `uploadDate` | string | Upload date (YYYY-MM-DD) | `"2025-01-20"` |
| `size` | string | File size | `"5.1 MB"` |

## 📂 Categories

### documents/
**For:** PDFs, Word docs, text files, guides
**Examples:**
- Tutorial PDFs
- User manuals
- Project documentation
- Worksheets

### images/
**For:** Photos, diagrams, graphics, screenshots
**Examples:**
- Project photos
- Wiring diagrams
- Blueprints
- Reference images

### videos/
**For:** Video files, tutorials, recordings
**Examples:**
- Tutorial videos
- Build process recordings
- Webinar recordings
- Demonstrations

### resources/
**For:** Templates, code, archives, tools
**Examples:**
- Code repositories (ZIP)
- Design templates
- 3D models
- Software tools

## 💡 Common Examples

### Example 1: Adding a PDF Tutorial

```bash
# 1. Copy file
cp tutorial.pdf public/members-files/documents/woodworking-101.pdf

# 2. Add to files.json
{
  "id": "3",
  "name": "Woodworking 101",
  "description": "Beginner's guide to woodworking techniques",
  "category": "documents",
  "filename": "woodworking-101.pdf",
  "uploadDate": "2025-01-22",
  "size": "3.2 MB"
}
```

### Example 2: Adding a Template Pack

```bash
# 1. Copy file
cp templates.zip public/members-files/resources/3d-print-templates.zip

# 2. Add to files.json
{
  "id": "4",
  "name": "3D Print Templates",
  "description": "STL files for common 3D printing projects",
  "category": "resources",
  "filename": "3d-print-templates.zip",
  "uploadDate": "2025-01-22",
  "size": "12.5 MB"
}
```

### Example 3: Adding Multiple Files

```bash
# Copy multiple files
cp guide1.pdf public/members-files/documents/
cp guide2.pdf public/members-files/documents/
cp video1.mp4 public/members-files/videos/

# Add all to files.json
{
  "files": [
    {
      "id": "5",
      "name": "Advanced Techniques Guide",
      "description": "Advanced project techniques",
      "category": "documents",
      "filename": "guide1.pdf",
      "uploadDate": "2025-01-22",
      "size": "2.1 MB"
    },
    {
      "id": "6",
      "name": "Safety Guidelines",
      "description": "Workshop safety best practices",
      "category": "documents",
      "filename": "guide2.pdf",
      "uploadDate": "2025-01-22",
      "size": "1.8 MB"
    },
    {
      "id": "7",
      "name": "Build Tutorial Video",
      "description": "Step-by-step build process",
      "category": "videos",
      "filename": "video1.mp4",
      "uploadDate": "2025-01-22",
      "size": "45.3 MB"
    }
  ]
}
```

## 🚀 Deployment to Hostinger

### Method 1: Using FTP/SFTP

1. Connect to your server with FileZilla or similar
2. Navigate to: `/path/to/gunnforge/public/members-files/`
3. Upload files to appropriate folders
4. Update `files.json` using text editor or re-upload

### Method 2: Using SSH/SCP

```bash
# Upload file via SCP
scp ~/Downloads/guide.pdf user@server:/path/to/gunnforge/public/members-files/documents/

# SSH into server and update files.json
ssh user@server
cd /path/to/gunnforge
nano public/members-files/files.json
# Add your file entry and save
```

### Method 3: Using Git

```bash
# Add files locally
cp ~/Downloads/guide.pdf public/members-files/documents/
# Update files.json

# Commit and push
git add public/members-files/
git commit -m "Add new member file: guide.pdf"
git push

# On server, pull changes
ssh user@server
cd /path/to/gunnforge
git pull
```

## 🔒 File Size Recommendations

- **Documents**: Keep under 10 MB
- **Images**: Optimize to under 5 MB each
- **Videos**: Compress to under 100 MB (or use external hosting)
- **Resources/Archives**: Keep under 50 MB

### Compressing Large Files

```bash
# Compress PDF (using Ghostscript)
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf

# Compress images (using ImageMagick)
convert input.jpg -quality 85 output.jpg

# Compress video (using FFmpeg)
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1M output.mp4
```

## 📊 File Organization Tips

### Use Clear Naming
```
✅ Good: "arduino-starter-guide.pdf"
❌ Bad: "doc1.pdf"

✅ Good: "project-templates-v2.zip"
❌ Bad: "templates.zip"
```

### Include Dates
```
{
  "name": "Monthly Newsletter - January 2025",
  "uploadDate": "2025-01-15"
}
```

### Organize by Topic
```json
{
  "files": [
    {"name": "Arduino Guide Part 1", "category": "documents"},
    {"name": "Arduino Guide Part 2", "category": "documents"},
    {"name": "Arduino Templates", "category": "resources"}
  ]
}
```

## 🛠️ Helper Script (Optional)

Create a script to add files more easily:

```bash
#!/bin/bash
# add-member-file.sh

FILENAME=$1
CATEGORY=$2
NAME=$3
DESCRIPTION=$4

if [ -z "$FILENAME" ] || [ -z "$CATEGORY" ]; then
  echo "Usage: ./add-member-file.sh <file> <category> <name> <description>"
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

Usage:
```bash
chmod +x add-member-file.sh
./add-member-file.sh ~/Downloads/guide.pdf documents "User Guide" "Complete user manual"
```

## ❓ Troubleshooting

### File won't download
- Check file exists in correct folder
- Verify filename in `files.json` matches actual file
- Check file permissions: `chmod 644 public/members-files/documents/*.pdf`

### File not showing on members page
- Verify `files.json` syntax is valid (use JSON validator)
- Check file entry has all required fields
- Refresh the page (clear cache: Ctrl+F5)

### File too large to upload
- Compress the file first
- Consider using external hosting (Google Drive, Dropbox) with download links
- Split into smaller parts

## 🔐 Security Notes

1. **Never store sensitive data** in member files
2. **Files are publicly accessible** if someone knows the URL
3. For truly private files, implement server-side download authentication
4. Regular members can't see files until they login
5. Don't put passwords or API keys in downloadable files

## 📱 File Access

Members access files at:
```
https://yourdomain.com/members
```

Direct file URLs (when logged in):
```
https://yourdomain.com/members-files/documents/guide.pdf
https://yourdomain.com/members-files/resources/templates.zip
```

## 🎯 Best Practices

1. **Regular Updates**: Add new content monthly
2. **Clear Descriptions**: Help members know what they're downloading
3. **Organize**: Group related files together
4. **Archive Old Files**: Remove outdated content
5. **Backup**: Keep copies of all member files
6. **Test Downloads**: Verify files work before announcing

---

**Need Help?** Check the main README or open an issue on GitHub.
