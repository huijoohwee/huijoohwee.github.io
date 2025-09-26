#!/bin/bash

# GitHub Pages Deployment Helper Script
# This script helps with common deployment tasks

echo "🚀 Joohwee GitHub Pages Deployment Helper"
echo "=========================================="

# Function to check if git is available
check_git() {
    if ! command -v git &> /dev/null; then
        echo "❌ Git is not installed or not in PATH"
        exit 1
    fi
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "❌ Not in a Git repository"
        exit 1
    fi
}

# Function to start local server
start_server() {
    echo "🌐 Starting local development server..."
    if command -v node &> /dev/null; then
        node server.js &
        echo "✅ Server started at http://localhost:3000"
        echo "Press Ctrl+C to stop the server"
    else
        echo "❌ Node.js not found. Please install Node.js to run the local server"
        exit 1
    fi
}

# Function to validate HTML
validate_html() {
    echo "🔍 Validating HTML..."
    if command -v node &> /dev/null; then
        node -e "
        const fs = require('fs');
        const html = fs.readFileSync('index.html', 'utf8');
        
        // Basic HTML validation
        const hasDoctype = html.includes('<!DOCTYPE html>');
        const hasHtmlTag = html.includes('<html') && html.includes('</html>');
        const hasHeadTag = html.includes('<head>') && html.includes('</head>');
        const hasBodyTag = html.includes('<body>') && html.includes('</body>');
        
        console.log('HTML Validation Results:');
        console.log('✅ DOCTYPE:', hasDoctype ? 'Present' : 'Missing');
        console.log('✅ HTML tag:', hasHtmlTag ? 'Present' : 'Missing');
        console.log('✅ HEAD tag:', hasHeadTag ? 'Present' : 'Missing');
        console.log('✅ BODY tag:', hasBodyTag ? 'Present' : 'Missing');
        
        if (hasDoctype && hasHtmlTag && hasHeadTag && hasBodyTag) {
            console.log('🎉 HTML structure looks good!');
        } else {
            console.log('⚠️  Some HTML issues found');
        }
        "
    else
        echo "❌ Node.js not found. Skipping HTML validation"
    fi
}

# Function to check file sizes
check_file_sizes() {
    echo "📊 Checking file sizes..."
    
    if [ -f "index.html" ]; then
        size=$(stat -f%z "index.html" 2>/dev/null || stat -c%s "index.html" 2>/dev/null || echo "0")
        echo "📄 index.html: $(($size / 1024))KB"
        
        if [ $size -gt 1048576 ]; then # 1MB
            echo "⚠️  index.html is larger than 1MB. Consider optimization."
        else
            echo "✅ File size is reasonable"
        fi
    fi
}

# Function to show deployment status
show_status() {
    echo "📋 Current Status:"
    echo "=================="
    
    # Check git status
    if git status &> /dev/null; then
        echo "📁 Repository: $(basename $(git rev-parse --show-toplevel))"
        echo "🌿 Current branch: $(git branch --show-current)"
        
        # Check for uncommitted changes
        if [[ -n $(git status -s) ]]; then
            echo "⚠️  Uncommitted changes detected"
            git status -s
        else
            echo "✅ Working directory clean"
        fi
        
        # Check last commit
        if git log -1 &> /dev/null; then
            echo "📝 Last commit: $(git log -1 --pretty=format:'%h - %s (%ci)')"
        fi
    fi
    
    # Check if GitHub remote exists
    if git remote get-url origin &> /dev/null; then
        echo "🌐 Remote: $(git remote get-url origin)"
    else
        echo "⚠️  No remote repository configured"
    fi
}

# Main menu
show_menu() {
    echo ""
    echo "Available commands:"
    echo "1. Start local server"
    echo "2. Validate HTML"
    echo "3. Check file sizes"
    echo "4. Show status"
    echo "5. Deploy to GitHub (manual)"
    echo "6. Exit"
    echo ""
}

# Manual deployment steps
manual_deploy() {
    echo "🚀 Manual Deployment Steps:"
    echo "==========================="
    echo "1. Ensure all changes are committed:"
    echo "   git add ."
    echo "   git commit -m 'Update site content'"
    echo ""
    echo "2. Push to GitHub:"
    echo "   git push origin main"
    echo ""
    echo "3. Monitor deployment:"
    echo "   - Go to GitHub repository"
    echo "   - Click Actions tab"
    echo "   - Monitor the deployment workflow"
    echo ""
    echo "4. Check live site:"
    echo "   https://joohwee.github.io"
}

# Main execution
main() {
    check_git
    check_git_repo
    
    while true; do
        show_menu
        read -p "Select an option (1-6): " choice
        
        case $choice in
            1)
                start_server
                break
                ;;
            2)
                validate_html
                ;;
            3)
                check_file_sizes
                ;;
            4)
                show_status
                ;;
            5)
                manual_deploy
                ;;
            6)
                echo "👋 Goodbye!"
                exit 0
                ;;
            *)
                echo "❌ Invalid option. Please select 1-6."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main