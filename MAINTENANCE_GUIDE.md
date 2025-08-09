# Quick Maintenance Guide

This is your cheat sheet for common website updates. For detailed instructions, see the main README.md file.

## 🚀 **Most Common Tasks**

### ✅ **Add New Portfolio Photo**
1. Upload photo to `images/portfolio/[artist-name]/`
2. Open `js/artist-data.js`
3. Find your artist's section (search for their name)
4. Copy the last portfolio entry and paste it below
5. Update the new entry:
   - Change `id` to next number
   - Change `filename` to your photo name
   - Update `title`, `style`, `placement`, etc.
6. Save and refresh website

### ✅ **Add New Blog Post**
1. Upload any photos to `images/blog/` (optional)
2. Open `js/blog-data.js`
3. Copy the first blog post at the top
4. Paste it at the very TOP of the posts array
5. Update all fields (id, title, date, content, etc.)
6. Save and refresh - appears immediately on studio page

### ✅ **Change Studio Address**
1. Open `js/config.js`
2. Find `studioInfo.address` section
3. Update street, city, state, zip
4. Save file

### ✅ **Update Phone Number**
1. Open `js/config.js`
2. Find `studioInfo.phone`
3. Change the number
4. Save file

### ✅ **Set Up MailerLite Newsletter**
1. Get API key from MailerLite account
2. Open `js/main.js`
3. Find line with `YOUR_MAILERLITE_API_KEY`
4. Replace with your real API key
5. Remove the `/*` and `*/` around the MailerLite code block
6. Save and test on website

### ✅ **Change Website Colors**
1. Open `js/config.js`
2. Find `colors` section
3. Update hex color codes (like #BFA46F)
4. Save file

### ✅ **Reorder Artists**
1. Open `js/artist-data.js`
2. Cut and paste entire artist sections to reorder them
3. First artist shows first on website
4. Save file

## 📁 **Key Files to Know**

| File | What It Does | When to Edit |
|------|-------------|--------------|
| `js/artist-data.js` | Artist info & portfolios | Add photos, update bios |
| `js/blog-data.js` | Blog posts & studio news | Add news, events, updates |
| `js/config.js` | Basic settings | Address, phone, colors |
| `js/main.js` | MailerLite setup | One-time newsletter setup |
| `index.html` | Homepage content | Rarely needed |
| `css/styles.css` | Visual styling | Advanced customization |

## 🔍 **Finding Things**

**To find specific content:**
1. Use your text editor's search function (Ctrl+F or Cmd+F)
2. Search for the text you want to change
3. Most settings are in the files listed above

**Common search terms:**
- Search for phone numbers, addresses, or email addresses
- Search for artist names
- Search for "TODO" to find setup tasks
- Search for color codes like "#BFA46F"

## ⚠️ **Before Making Changes**

1. **Make a backup** of your website files
2. **Test changes** on a single page first
3. **Check for typos** - they can break the website
4. **Save often** while making changes

## 🆘 **If Something Breaks**

1. **Undo your last change** and save
2. **Check browser console** (F12 key) for error messages
3. **Look for missing commas** or quotes in JavaScript files
4. **Restore from backup** if needed

## 📱 **Testing Your Changes**

After making changes:
1. **Refresh your website** (Ctrl+F5 or Cmd+Shift+R)
2. **Test on mobile** by resizing your browser window
3. **Check all pages** work correctly
4. **Test the newsletter signup** if you changed MailerLite settings

---

*Keep this guide handy! Most website maintenance only requires editing 1-2 files.*