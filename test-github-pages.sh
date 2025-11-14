#!/bin/bash
# Script to test GitHub Pages deployment locally
# This simulates how GitHub Pages will serve your site

echo "Testing GitHub Pages deployment locally..."
echo ""
echo "Creating temporary directory structure that matches GitHub Pages..."

# Create a temp directory to simulate GitHub Pages structure
TEMP_DIR=$(mktemp -d)
mkdir -p "$TEMP_DIR/advisor-calculator"

# Copy the built files to simulate GitHub Pages structure
echo "Copying built files..."
cp -r out/* "$TEMP_DIR/advisor-calculator/"

echo ""
echo "✅ Test setup complete!"
echo ""
echo "Starting server at http://localhost:8080"
echo "Your site will be available at: http://localhost:8080/advisor-calculator/en.html"
echo ""
echo "Available pages:"
echo "  - English:  http://localhost:8080/advisor-calculator/en.html"
echo "  - Chinese:  http://localhost:8080/advisor-calculator/zh.html"
echo "  - Japanese: http://localhost:8080/advisor-calculator/ja.html"
echo "  - Spanish:  http://localhost:8080/advisor-calculator/es.html"
echo "  - French:   http://localhost:8080/advisor-calculator/fr.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start server from temp directory (simulating GitHub's root)
cd "$TEMP_DIR"
python3 -m http.server 8080

# Cleanup on exit
trap "rm -rf $TEMP_DIR" EXIT
