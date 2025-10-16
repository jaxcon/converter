import { Link } from "react-router-dom";
import {
    Section,
    SectionTitle,
    Grid,
    ToolCard,
    IconCircle,
    ToolTitle,
    ToolDesc
} from "../styles";

export default function ToolsSection({ title, tools }) {
    return (
        <Section>
            <SectionTitle>{title}</SectionTitle>
            <Grid>
                {tools.map(({ name, path, color, icon: Icon, desc }) => (
                    <Link to={path} key={path} style={{ textDecoration: "none" }}>
                        <ToolCard color={color}>
                            <IconCircle color={color}><Icon /></IconCircle>
                            <ToolTitle>{name}</ToolTitle>
                            <ToolDesc>{desc}</ToolDesc>
                        </ToolCard>
                    </Link>
                ))}
            </Grid>
        </Section>
    );
}