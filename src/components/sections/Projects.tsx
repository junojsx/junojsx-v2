import { projects } from "@/data/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-white py-16 min-h-screen sm:py-24 flex items-center justify-center border-t border-solid-black/100 "
    >
      <div className="max-w-6xl   mx-auto px-4">
        {/* Heading area */}
        <AnimateIn from="bottom" duration={600}>
          {/* Decorative label — aria-hidden since heading already describes the section */}
          <p
            className="text-soft-teal font-semibold uppercase tracking-widest text-sm text-center mb-3"
            aria-hidden="true"
          >
            What I've built
          </p>
          <h2
            id="projects-heading"
            className="text-3xl font-bold text-dark-gray text-center mb-4"
          >
            Deployed Projects
          </h2>
          <p className="text-center text-dark-gray/70 mb-14 max-w-xl mx-auto">
            A selection of accessible, production-ready applications I've shipped.
          </p>
        </AnimateIn>

        <ul
          role="list"
          aria-label="Project gallery"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <AnimateIn
              as="li"
              key={project.id}
              delay={i * 100}
              duration={600}
              className="h-full"
            >
              <article
                aria-labelledby={`project-title-${project.id}`}
                className="h-full"
              >
                <Card
                  className="h-full flex flex-col border-soft-lavender/40
                             hover:border-soft-lavender hover:shadow-md transition-all"
                >
                  <CardHeader>
                    {/* h3 gives project titles a proper place in the document outline */}
                    <h3
                      id={`project-title-${project.id}`}
                      className="font-semibold leading-none tracking-tight text-deep-purple text-xl"
                    >
                      {project.name}
                    </h3>
                    <CardDescription className="text-dark-gray/70 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-wrap gap-2">
                    {project.techTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-soft-lavender/25 text-deep-purple border-0 font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>

                  <CardFooter className="mt-auto flex gap-3 pt-4">
                    <Button
                      asChild
                      size="sm"
                      className="bg-deep-purple hover:bg-hover-active text-white flex-1"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live site for ${project.name} (opens in new tab)`}
                      >
                        <ExternalLink
                          className="mr-1.5 h-4 w-4"
                          aria-hidden="true"
                        />
                        Live
                      </a>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-deep-purple text-deep-purple hover:bg-soft-lavender/20
                                 hover:text-deep-purple flex-1"
                    >
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.name} on GitHub (opens in new tab)`}
                      >
                        <Github className="mr-1.5 h-4 w-4" aria-hidden="true" />
                        Code
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </article>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
