/// <reference types="cypress" />

describe("Theme Switching with LocalStorage persistance", () => {
  beforeEach(() => {
    cy.setCookie("token", "mock-token");
    cy.visit("/");
  });

  it("Should load dark theme if system prefers dark and persists", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "matchMedia").callsFake((query) => {
          return {
            matches: query === "(prefers-color-scheme: dark)",
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          };
        });
      },
    });

    cy.reload();
    cy.get("html").should("have.class", "dark");
  });

  it("Switches to dark theme and persists after reload", () => {
    cy.get('[data-testid="theme-toggle"]').click();
    cy.contains("Dark").click();

    // Verifica classe 'dark' foi aplicada
    cy.get("html").should("have.class", "dark");

    // Verifica valor salvo no localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem("theme")).to.eq("dark");
    });

    // Recarrega e verifica persistência
    cy.reload();
    cy.get("html").should("have.class", "dark");
  });

  it("Switches to light theme and persists after reload", () => {
    cy.get('[data-testid="theme-toggle"]').click();
    cy.contains("Light").click();

    cy.get("html").should("not.have.class", "dark");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("theme")).to.eq("light");
    });

    cy.reload();
    cy.get("html").should("not.have.class", "dark");
  });

  it("Switches to system theme and persists after reload", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "matchMedia").callsFake((query) => ({
          matches: query === "(prefers-color-scheme: dark)",
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }));
      },
    });

    cy.get('[data-testid="theme-toggle"]').click();
    cy.contains("System").click();

    cy.window().its("localStorage.theme").should("eq", "system");
    cy.get("html").should("have.class", "dark");

    cy.reload();

    cy.window().its("localStorage.theme").should("eq", "system");
    cy.get("html").should("have.class", "dark");
  });
});
