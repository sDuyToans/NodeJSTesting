const redirectFunc = (route) => {
    const currentUrl = window.location.href;
    // Redirect to the absolute route
    window.location.href = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1) + route;
}