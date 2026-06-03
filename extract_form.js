fetch('https://forms.gle/31dJTvV3bifBB3zF9', { redirect: 'follow' })
  .then(res => res.text())
  .then(html => {
    if (html.includes("FB_PUBLIC_LOAD_DATA_")) {
        const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/);
        if (match) {
            const data = JSON.parse(match[1]);
            const items = data[1][1];
            
            items.forEach(item => {
                const title = item[1];
                const type = item[3]; // 0=text, 1=para, 2=radio, 3=dropdown, 4=checkbox
                if(item[4] && item[4][0]) {
                    const entryId = item[4][0][0];
                    console.log(`Field: "${title}" (Type: ${type}) -> entry.${entryId}`);
                    if (item[4][0][1]) {
                        console.log('  Options:', item[4][0][1].map(opt => opt[0]).join(' | '));
                    }
                }
            });
        }
    }
  }).catch(console.error);
