export const Feed = () => {
    const FeedDiv = document.createElement('div');
    const template = `
        <section class="feed" id="feed">
        <textarea type= 'text'>Feed</h1>
        </section>
    `
    FeedDiv.innerHTML = template 
    return FeedDiv;
}