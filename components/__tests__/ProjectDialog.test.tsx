import React from "react";
import { render, screen } from "@testing-library/react-native";
import type { Project } from "../../types/project";
import { ProjectDialog } from "../ProjectDialog";
import { TestProviders } from "../testHelpers/TestProviders";

const projectWithLinks: Project = {
  name: "ToDo",
  company: "Personal Project",
  description:
    "A comprehensive task management platform with robust security features.",
  tech_stack: ["NextJS", "React", "Spring Boot"],
  role: "Full Stack Developer",
  responsibilities: [
    "Designed and developed responsive frontend using NextJS and Tailwind CSS",
    "Implemented robust backend architecture with Spring Boot and Java",
  ],
  github_link: "https://github.com/kingslytshepiso/to-do-frontend.git",
  website_link: "https://example.com",
};

const projectWithoutLinks: Project = {
  name: "Droppa Courier Applications",
  company: "Droppa",
  description: "Proprietary courier and delivery applications.",
  tech_stack: ["Java EE", "Angular"],
  role: "Full Stack Developer",
  responsibilities: ["Developed customer-facing courier applications"],
  github_link: null,
  website_link: null,
};

function renderDialog(
  project: Project | null = projectWithLinks,
  visible = true
) {
  return render(
    <TestProviders>
      <ProjectDialog
        project={project}
        visible={visible}
        onDismiss={jest.fn()}
        getImageSource={jest.fn()}
      />
    </TestProviders>
  );
}

describe("ProjectDialog", () => {
  it("shows project name, description, role, responsibilities, and tech stack when visible", () => {
    renderDialog(projectWithLinks, true);
    expect(screen.getByText("ToDo")).toBeTruthy();
    expect(
      screen.getByText(
        "A comprehensive task management platform with robust security features."
      )
    ).toBeTruthy();
    expect(screen.getByText(/Full Stack Developer/)).toBeTruthy();
    expect(
      screen.getByText(
        "• Designed and developed responsive frontend using NextJS and Tailwind CSS"
      )
    ).toBeTruthy();
    expect(screen.getByText("NextJS")).toBeTruthy();
    expect(screen.getByText("Spring Boot")).toBeTruthy();
  });

  it("shows Visit Site and View Repository when links exist", () => {
    renderDialog(projectWithLinks, true);
    expect(screen.getByText("Visit Site")).toBeTruthy();
    expect(screen.getByText("View Repository")).toBeTruthy();
  });

  it("hides Visit Site and View Repository when links are absent", () => {
    renderDialog(projectWithoutLinks, true);
    expect(screen.getByText("Close")).toBeTruthy();
    expect(screen.queryByText("Visit Site")).toBeNull();
    expect(screen.queryByText("View Repository")).toBeNull();
  });

  it("renders nothing when project is null", () => {
    const { queryByText } = render(
      <TestProviders>
        <ProjectDialog
          project={null}
          visible={true}
          onDismiss={jest.fn()}
          getImageSource={jest.fn()}
        />
      </TestProviders>
    );
    expect(queryByText("Close")).toBeNull();
    expect(queryByText("Visit Site")).toBeNull();
  });
});
