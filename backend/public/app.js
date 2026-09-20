const state = {
  token: localStorage.getItem("digitalWillToken") || "",
  user: JSON.parse(localStorage.getItem("digitalWillUser") || "null"),
  wills: [],
  editingId: null,
};

const elements = {
  loginForm: document.getElementById("login-form"),
  registerForm: document.getElementById("register-form"),
  authMessage: document.getElementById("auth-message"),
  showLogin: document.getElementById("show-login"),
  showRegister: document.getElementById("show-register"),
  dashboard: document.getElementById("dashboard"),
  welcomeHeading: document.getElementById("welcome-heading"),
  logoutButton: document.getElementById("logout-button"),
  refreshWills: document.getElementById("refresh-wills"),
  willForm: document.getElementById("will-form"),
  willMessage: document.getElementById("will-message"),
  willsList: document.getElementById("wills-list"),
  willsEmpty: document.getElementById("wills-empty"),
  editorTitle: document.getElementById("editor-title"),
  resetForm: document.getElementById("reset-form"),
  saveWillButton: document.getElementById("save-will-button"),
};

const setStatus = (element, message, isError = false) => {
  element.textContent = message || "";
  element.style.color = isError ? "#aa3f2a" : "#1f5a46";
};

const switchAuthMode = (mode) => {
  const isLogin = mode === "login";
  elements.loginForm.classList.toggle("hidden", !isLogin);
  elements.registerForm.classList.toggle("hidden", isLogin);
  elements.showLogin.classList.toggle("active", isLogin);
  elements.showRegister.classList.toggle("active", !isLogin);
  setStatus(elements.authMessage, "");
};

const parseList = (value, mapItem) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((part) => part.trim()))
    .map(mapItem)
    .filter(Boolean);

const beneficiariesToText = (beneficiaries = []) =>
  beneficiaries
    .map((item) =>
      [
        item.name || "",
        item.relation || "",
        item.email || "",
        item.allocationPercentage ?? "",
        item.notes || "",
      ].join(" | "),
    )
    .join("\n");

const assetsToText = (assets = []) =>
  assets
    .map((item) =>
      [
        item.name || "",
        item.category || "other",
        item.estimatedValue ?? "",
        item.location || "",
        item.assignedTo || "",
        item.digitalAccessInfo || "",
      ].join(" | "),
    )
    .join("\n");

const witnessesToText = (witnesses = []) =>
  witnesses
    .map((item) =>
      [item.name || "", item.email || "", item.status || "pending"].join(" | "),
    )
    .join("\n");

const serializeWillForm = () => {
  const formData = new FormData(elements.willForm);

  return {
    title: formData.get("title")?.toString().trim(),
    status: formData.get("status"),
    executor: {
      name: formData.get("executorName")?.toString().trim(),
      email: formData.get("executorEmail")?.toString().trim(),
      phone: formData.get("executorPhone")?.toString().trim(),
    },
    beneficiaries: parseList(
      formData.get("beneficiaries")?.toString() || "",
      (parts) => {
        if (!parts[0]) {
          return null;
        }

        const allocation = Number(parts[3]);

        return {
          name: parts[0],
          relation: parts[1] || "",
          email: parts[2] || "",
          allocationPercentage: Number.isFinite(allocation)
            ? allocation
            : undefined,
          notes: parts[4] || "",
        };
      },
    ),
    assets: parseList(formData.get("assets")?.toString() || "", (parts) => {
      if (!parts[0]) {
        return null;
      }

      const estimatedValue = Number(parts[2]);

      return {
        name: parts[0],
        category: parts[1] || "other",
        estimatedValue: Number.isFinite(estimatedValue)
          ? estimatedValue
          : undefined,
        location: parts[3] || "",
        assignedTo: parts[4] || "",
        digitalAccessInfo: parts[5] || "",
      };
    }),
    witnesses: parseList(
      formData.get("witnesses")?.toString() || "",
      (parts) => {
        if (!parts[0]) {
          return null;
        }

        return {
          name: parts[0],
          email: parts[1] || "",
          status: parts[2] === "confirmed" ? "confirmed" : "pending",
        };
      },
    ),
    guardianshipNotes: formData.get("guardianshipNotes")?.toString().trim(),
    finalWishes: formData.get("finalWishes")?.toString().trim(),
    lastReviewedAt: formData.get("lastReviewedAt") || null,
  };
};

const populateWillForm = (will) => {
  elements.willForm.elements.willId.value = will._id;
  elements.willForm.elements.title.value = will.title || "";
  elements.willForm.elements.status.value = will.status || "draft";
  elements.willForm.elements.executorName.value = will.executor?.name || "";
  elements.willForm.elements.executorEmail.value = will.executor?.email || "";
  elements.willForm.elements.executorPhone.value = will.executor?.phone || "";
  elements.willForm.elements.lastReviewedAt.value = will.lastReviewedAt
    ? will.lastReviewedAt.slice(0, 10)
    : "";
  elements.willForm.elements.beneficiaries.value = beneficiariesToText(
    will.beneficiaries,
  );
  elements.willForm.elements.assets.value = assetsToText(will.assets);
  elements.willForm.elements.witnesses.value = witnessesToText(will.witnesses);
  elements.willForm.elements.guardianshipNotes.value =
    will.guardianshipNotes || "";
  elements.willForm.elements.finalWishes.value = will.finalWishes || "";

  state.editingId = will._id;
  elements.editorTitle.textContent = "Edit will";
  elements.saveWillButton.textContent = "Update will";
  elements.resetForm.classList.remove("hidden");
};

const resetWillForm = () => {
  elements.willForm.reset();
  elements.willForm.elements.status.value = "draft";
  elements.willForm.elements.willId.value = "";
  state.editingId = null;
  elements.editorTitle.textContent = "Create a will";
  elements.saveWillButton.textContent = "Save will";
  elements.resetForm.classList.add("hidden");
  setStatus(elements.willMessage, "");
};

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${state.token}`,
});

const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Something went wrong");
  }

  return data;
};

const saveSession = (token, user) => {
  state.token = token;
  state.user = user;
  localStorage.setItem("digitalWillToken", token);
  localStorage.setItem("digitalWillUser", JSON.stringify(user));
};

const clearSession = () => {
  state.token = "";
  state.user = null;
  state.wills = [];
  localStorage.removeItem("digitalWillToken");
  localStorage.removeItem("digitalWillUser");
  resetWillForm();
  renderWills();
  elements.dashboard.classList.add("hidden");
};

const renderWills = () => {
  elements.willsList.innerHTML = "";
  const hasWills = state.wills.length > 0;
  elements.willsEmpty.classList.toggle("hidden", hasWills);

  state.wills.forEach((will) => {
    const card = document.createElement("article");
    card.className = "will-card";
    card.innerHTML = `
            <div class="will-card-header">
                <div>
                    <div class="will-card-title">${will.title}</div>
                    <p class="meta-row">Executor: ${will.executor?.name || "Not added yet"}</p>
                </div>
                <span class="status-pill">${will.status}</span>
            </div>
            <p class="meta-row">Beneficiaries: ${will.beneficiaries?.length || 0} | Assets: ${will.assets?.length || 0} | Witnesses: ${will.witnesses?.length || 0}</p>
            <p class="meta-row">${will.finalWishes || "No final wishes added yet."}</p>
            <div class="will-card-footer">
                <small>Updated ${new Date(will.updatedAt).toLocaleString()}</small>
                <div class="card-actions">
                    <button class="ghost-button" type="button" data-action="edit" data-id="${will._id}">Edit</button>
                    <button class="ghost-button" type="button" data-action="delete" data-id="${will._id}">Delete</button>
                </div>
            </div>
        `;

    elements.willsList.appendChild(card);
  });
};

const loadWills = async () => {
  if (!state.token) {
    return;
  }

  try {
    const wills = await request("/api/wills", {
      headers: authHeaders(),
    });
    state.wills = wills;
    renderWills();
  } catch (error) {
    setStatus(elements.willMessage, error.message, true);
  }
};

const showDashboard = async () => {
  elements.dashboard.classList.remove("hidden");
  elements.welcomeHeading.textContent = state.user
    ? `${state.user.name}'s wills`
    : "Your wills";
  await loadWills();
};

elements.showLogin.addEventListener("click", () => switchAuthMode("login"));
elements.showRegister.addEventListener("click", () =>
  switchAuthMode("register"),
);

elements.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(elements.registerForm);
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const data = await request("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    saveSession(data.token, data.user);
    elements.registerForm.reset();
    setStatus(
      elements.authMessage,
      "Account created. Your workspace is ready.",
    );
    await showDashboard();
  } catch (error) {
    setStatus(elements.authMessage, error.message, true);
  }
});

elements.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(elements.loginForm);
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const data = await request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    saveSession(data.token, data.user);
    elements.loginForm.reset();
    setStatus(elements.authMessage, "Logged in successfully.");
    await showDashboard();
  } catch (error) {
    setStatus(elements.authMessage, error.message, true);
  }
});

elements.willForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = serializeWillForm();
  const method = state.editingId ? "PUT" : "POST";
  const url = state.editingId ? `/api/wills/${state.editingId}` : "/api/wills";

  try {
    await request(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });

    setStatus(
      elements.willMessage,
      state.editingId
        ? "Will updated successfully."
        : "Will saved successfully.",
    );
    resetWillForm();
    await loadWills();
  } catch (error) {
    setStatus(elements.willMessage, error.message, true);
  }
});

elements.willsList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;
  const will = state.wills.find((item) => item._id === id);

  if (action === "edit" && will) {
    populateWillForm(will);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (action === "delete" && id) {
    const confirmed = window.confirm("Delete this will?");
    if (!confirmed) {
      return;
    }

    try {
      await request(`/api/wills/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (state.editingId === id) {
        resetWillForm();
      }
      setStatus(elements.willMessage, "Will deleted successfully.");
      await loadWills();
    } catch (error) {
      setStatus(elements.willMessage, error.message, true);
    }
  }
});

elements.logoutButton.addEventListener("click", () => {
  clearSession();
  setStatus(elements.authMessage, "Logged out.");
});

elements.refreshWills.addEventListener("click", () => {
  loadWills();
});

elements.resetForm.addEventListener("click", () => {
  resetWillForm();
});

if (state.token && state.user) {
  showDashboard();
}

switchAuthMode("login");
