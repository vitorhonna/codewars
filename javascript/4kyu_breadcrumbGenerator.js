const assert = require('./tester.js');

// ------------------------ CODE ------------------------

function generateBC(url, separator) {
  // Get array of all pages after root/home
  let pages = url.match(/\/+(\w|-|)*/g) || [];

  // Clean array of pages (removing single /)
  pages = pages.map((i) => i.slice(1)).filter((i) => i);

  // Remove first page if it's the domain
  if (/\//.test(pages[0])) pages.shift();

  // Remove last page if it's an 'index'
  if (/index/.test(pages.slice(-1)[0])) pages.pop();

  // Return breadcrumbs if home is the only page
  if (pages.length == 0) return '<span class="active">HOME</span>';

  // Abbreviate page names if necessary
  function abbreviateIfNecessary(pageName) {
    if (pageName.length < 31) {
      pageName = pageName.split('-');

      if (pageName.length == 1) return pageName[0];

      return pageName.join(' ');
    }

    const ignore = ['the', 'of', 'in', 'from', 'by', 'with', 'and', 'or', 'for', 'to', 'at', 'a'];

    const pageInitials = pageName
      .split('-')
      .filter((word) => !ignore.includes(word))
      .reduce((initials, word) => {
        return (initials += word[0]);
      }, '');

    return pageInitials;
  }

  // HTML for the active page
  const activePage = `${separator}<span class="active">${abbreviateIfNecessary(pages.pop()).toUpperCase()}</span>`;

  // HTML for the pages between home and the active one
  const middle = pages
    .map((page, i) => {
      const link = pages.slice(0, i + 1).join('/');
      return `${separator}<a href="/${link}/">${abbreviateIfNecessary(page).toUpperCase()}</a>`;
    })
    .join('');

  return `<a href="/">HOME</a>${middle}${activePage}`;
}

//  ----------------------- TESTS -----------------------

runTests();

function runTests() {
  assert.equals(
    generateBC('google.ca/test.asp#info', ' ; '),
    '<a href="/">HOME</a> ; <span class="active">TEST</span>'
  );

  assert.equals(
    generateBC(
      'https://google.ca/users/from-in-and-bladder-surfer-for-insider-uber-skin-meningitis/secret-page.htm#conclusion',
      ' # '
    ),
    '<a href="/">HOME</a> # <a href="/users/">USERS</a> # <a href="/users/from-in-and-bladder-surfer-for-insider-uber-skin-meningitis/">BSIUSM</a> # <span class="active">SECRET PAGE</span>'
  );

  assert.equals(
    generateBC('mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/', ' > '),
    '<a href="/">HOME</a> > <span class="active">VLUMSYME</span>'
  );

  assert.equals(generateBC('www.codewars.com', ' : '), '<span class="active">HOME</span>');

  assert.equals(generateBC('https://codewars.com/', ' : '), '<span class="active">HOME</span>');

  assert.equals(generateBC('https://codewars.com/index.html', ' : '), '<span class="active">HOME</span>');

  assert.equals(
    generateBC('mysite.com/pictures/holidays.html#1', ' : '),
    '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>'
  );
  assert.equals(
    generateBC('www.codewars.com/users/GiacomoSorbi', ' / '),
    '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>'
  );
  assert.equals(
    generateBC('www.codewars.com/users/Giacomo-Sorbi', ' / '),
    '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMO SORBI</span>'
  );
  assert.equals(
    generateBC('www.microsoft.com/important/confidential/docs/index.htm#top', ' * '),
    '<a href="/">HOME</a> * <a href="/important/">IMPORTANT</a> * <a href="/important/confidential/">CONFIDENTIAL</a> * <span class="active">DOCS</span>'
  );
  assert.equals(
    generateBC('mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp', ' > '),
    '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
  );
  assert.equals(
    generateBC('www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi', ' + '),
    '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'
  );
}
