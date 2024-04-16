import { useState, Suspense, lazy } from 'react';
import { Remarkable } from 'remarkable';

// Loading component to display while content is loading
const Loading: React.FC = () => {
    return <p><i>Loading...</i></p>;
}

/////////////////////////////// loding component

// Markdown preview component
const md = new Remarkable();
const MarkdownPreviewComp: React.FC<{ markdown: string }> = ({ markdown }) => {
    return (
        <div
            className="content"
            dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
        />
    );
}

/////////////////////////////// MarkdownPreviewComp component


// Lazy-loaded MarkdownPreview component
const MarkdownPreview = lazy(() => delayForDemo(() => Promise.resolve({ default: MarkdownPreviewComp })));

// Add a fixed delay so you can see the loading state
async function delayForDemo<T>(load: () => Promise<T>): Promise<T> {
    await new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
    return load();
}

////////////////////////////////////////

// Markdown editor component
const MarkdownEditor: React.FC = () => {
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [markdown, setMarkdown] = useState<string>('Hello, **world**!');

    return (
        <>
            {/* Textarea for markdown input */}
            <textarea value={markdown} onChange={e => setMarkdown(e.target.value)} />

            {/* Checkbox to toggle preview */}
            <label>
                <input type="checkbox" checked={showPreview} onChange={e => setShowPreview(e.target.checked)} />
                Show preview
            </label>
            <hr />

            {/* Suspense to handle lazy loading with fallback loading component */}
            {showPreview && (
                <Suspense fallback={<Loading />}>
                    <h2>Preview</h2>
                    <MarkdownPreview markdown={markdown} />
                </Suspense>
            )}
        </>
    );
}


// LazyLoad component that renders MarkdownEditor
const LazyLoad: React.FC = () => {
    return <MarkdownEditor />;
};

export default LazyLoad;
