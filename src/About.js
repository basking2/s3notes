
import { Link } from 'react-router-dom';
import './About.css';
import { Typography } from '@mui/material';
import buildInfo from './build_info';

function About() {

    const exampleLinks = {
    "links": [
        {
            "name": "Notes",
            "filename": "notes.adoc"
        },
        {
            "name": "GitHub",
            "href": "http://github.com"
        }
    ]
}

  return (
    <div className="About">
        <h1>About {buildInfo.name}-{buildInfo.version} {buildInfo.build}</h1>

        <Typography variant="h4" component="h2">Document Links</Typography>
        Document links to documents within the wiki are a little special because
        this is a progressive webapp targetted at static site servers, such
        as S3.

        To link to another document, say, <code>foo.adoc</code>,
        you want a link who's <code>href</code> attribute is 
        <code>#/view?file=foo.adoc</code>.

        In the case of Markdown, this appears as so:

        <pre style={{padding: "1em", backgroundColor: "#e0e0e0"}}>
        [foo](#/view?file=foo.adoc)
        </pre>


        <Typography variant="h4" component="h2">Home Page</Typography>
        <p>The home page is the root of the application.
            Its contents may be replaced with a Markdown file by 
            editing <Link to="/edit?file=_home.md&type=md">_home.md</Link>.

        </p>
        <Typography variant="h4" component="h2">Sidebar Files</Typography>

        <p>Sidebar files define content on the left of the page.
            There are two of them, <code>_sidebar.json</code>
            and <code>_sidebar2.json</code>. 
            Two files are provides so that one may be encrypted and the
            other not. They render in order, <code>_sidebar.json</code>
            rendering first.
        </p>

        <table cols="2">
            <tbody>
            <tr>
                <td width="50%" style={{verticalAlign: "top"}}>
                    <ul>
                        <li><Link to="/edit?file=_sidebar.json&type=json">Sidebar</Link>
                        - Edit the main sidebar file. Example:
                        </li>
                        <li><Link to="/edit?file=_sidebar2.json&type=json">Sidebar 2</Link>
                        - A second sidebar file so you can encrypt one and, optionally, not encrypt the other. Example:
                        </li>
                        </ul>
                </td>
                <td style={{verticalAlign: "top", backgroundColor: "#e0e0e0", padding: "1em"}}>
                    <p>Example Sidebar JSON</p>
                    <pre>
                        {JSON.stringify(exampleLinks, 2, 2)}
                    </pre>
                </td>
            </tr>
            </tbody>
        </table>

        <Typography variant="h4" component="h2">License</Typography>
        <p style={{fontFamily: "monospace", whiteSpace: "pre-wrap", maxWidth: "80em"}} >
            {buildInfo.license}
        </p>

    </div>
  );
}


export default About;
