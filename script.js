// This code simulates a separate script.js file
// It will be dynamically inserted into the HTML document upon loading.

document.addEventListener('DOMContentLoaded', function() {
    // Firebase services will be available via window.firebaseServices after the module script loads
    let db, auth, currentUserId, appId;

    // Wait for Firebase to be initialized and user authenticated
    const waitForFirebase = () => {
        return new Promise((resolve) => {
            const check = () => {
                // Ensure all necessary Firebase properties are available
                if (window.firebaseServices && window.firebaseServices.db && 
                    window.firebaseServices.auth && window.firebaseServices.currentUserId !== undefined) {
                    db = window.firebaseServices.db;
                    auth = window.firebaseServices.auth;
                    currentUserId = window.firebaseServices.currentUserId;
                    appId = window.firebaseServices.appId;
                    resolve();
                } else {
                    setTimeout(check, 50); // Check again after a short delay
                }
            };
            check();
        });
    };

    // === DOM Element References ===
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('mainContent');
    const createButtonBtn = document.getElementById('createButtonBtn');
    const showCodeBtn = document.getElementById('showCodeBtn');
    const generatedCodeDisplay = document.getElementById('generatedCodeDisplay');
    const generatedCodeContent = document.getElementById('generatedCodeContent');
    const closeCodeDisplayBtn = document.getElementById('closeCodeDisplayBtn');
    const emptyContentMessage = document.getElementById('emptyContentMessage');

    const saveProjectBtn = document.getElementById('saveProjectBtn');
    const loadProjectBtn = document.getElementById('loadProjectBtn');
    const statusMessage = document.getElementById('statusMessage');

    // Element Settings Modal
    const elementSettingsModal = document.getElementById('elementSettingsModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveElementSettingsBtn = document.getElementById('saveElementSettingsBtn');
    const deleteElementBtn = document.getElementById('deleteElementBtn');
    const cancelElementSettingsBtn = document.getElementById('cancelElementSettingsBtn');

    // Element properties inputs (within modal)
    const elementText = document.getElementById('elementText');
    const geminiPrompt = document.getElementById('geminiPrompt'); // LLM related
    const generateTextBtn = document.getElementById('generateTextBtn'); // LLM related
    const geminiLoading = document.getElementById('geminiLoading'); // LLM related
    const geminiError = document.getElementById('geminiError'); // LLM related

    const elementZIndex = document.getElementById('elementZIndex');
    const elementBgColor = document.getElementById('elementBgColor');
    const elementBgAlpha = document.getElementById('elementBgAlpha'); // New: Alpha for element background color
    const elementImageUrl = document.getElementById('elementImageUrl');
    const applyElementBgImageBtn = document.getElementById('applyElementBgImageBtn');
    const elementImageUpload = document.getElementById('elementImageUpload');
    const elementBackgroundSize = document.getElementById('elementBackgroundSize');
    const elementBackgroundRepeat = document.getElementById('elementBackgroundRepeat');
    const elementBackgroundPosition = document.getElementById('elementBackgroundPosition');
    const elementOpacity = document.getElementById('elementOpacity'); // Overall element opacity
    const elementFilterBlur = document.getElementById('elementFilterBlur');
    const elementFilterGrayscale = document.getElementById('elementFilterGrayscale');
    const elementFilterBrightness = document.getElementById('elementFilterBrightness');
    const elementFilterContrast = document.getElementById('elementFilterContrast');
    const elementFilterSepia = document.getElementById('elementFilterSepia');
    const elementFilterHueRotate = document.getElementById('elementFilterHueRotate');
    const elementFilterInvert = document.getElementById('elementFilterInvert');
    const elementFilterSaturate = document.getElementById('elementFilterSaturate');
    const elementBackgroundAnimation = document.getElementById('elementBackgroundAnimation');
    const elementAnimationDuration = document.getElementById('elementAnimationDuration');
    const elementTextColor = document.getElementById('elementTextColor');
    const elementBorder = document.getElementById('elementBorder');
    const elementBorderStyle = document.getElementById('elementBorderStyle');
    const elementBorderRadius = document.getElementById('elementBorderRadius');
    const elementFontSize = document.getElementById('elementFontSize');
    const elementFontFamily = document.getElementById('elementFontFamily');
    const elementFontWeight = document.getElementById('elementFontWeight');
    const elementLetterSpacing = document.getElementById('elementLetterSpacing');
    const elementTextAlign = document.getElementById('elementTextAlign');
    const elementWidth = document.getElementById('elementWidth');
    const elementHeight = document.getElementById('elementHeight');
    const stretchWidthBtn = document.getElementById('stretchWidthBtn'); // New: Stretch width button
    const stretchHeightBtn = document.getElementById('stretchHeightBtn'); // New: Stretch height button
    // Text Shadow
    const elementTextShadowColor = document.getElementById('elementTextShadowColor');
    const elementTextShadowBlur = document.getElementById('elementTextShadowBlur');
    const elementTextShadowOffsetX = document.getElementById('elementTextShadowOffsetX');
    const elementTextShadowOffsetY = document.getElementById('elementTextShadowOffsetY');
    const resetElementTextShadowBtn = document.getElementById('resetElementTextShadowBtn');
    // Box Shadow
    const elementBoxShadowColor = document.getElementById('elementBoxShadowColor');
    const elementBoxShadowOffsetX = document.getElementById('elementBoxShadowOffsetX');
    const elementBoxShadowOffsetY = document.getElementById('elementBoxShadowOffsetY');
    const elementBoxShadowBlur = document.getElementById('elementBoxShadowBlur');
    const elementBoxShadowSpread = document.getElementById('elementBoxShadowSpread');
    const resetElementBoxShadowBtn = document.getElementById('resetElementBoxShadowBtn');
    // Margin
    const elementMarginTop = document.getElementById('elementMarginTop');
    const elementMarginRight = document.getElementById('elementMarginRight');
    const elementMarginBottom = document.getElementById('elementMarginBottom');
    const elementMarginLeft = document.getElementById('elementMarginLeft');
    const elementMarginUnit = document.getElementById('elementMarginUnit');
    const resetElementMarginBtn = document.getElementById('resetElementMarginBtn');
    // Padding
    const elementPaddingTop = document.getElementById('elementPaddingTop');
    const elementPaddingRight = document.getElementById('elementPaddingRight');
    const elementPaddingBottom = document.getElementById('elementPaddingBottom');
    const elementPaddingLeft = document.getElementById('elementPaddingLeft');
    const elementPaddingUnit = document.getElementById('elementPaddingUnit');
    const resetElementPaddingBtn = document.getElementById('resetElementPaddingBtn');

    // Element Background Filters Reset Button
    const resetElementBgFiltersBtn = document.getElementById('resetElementBgFiltersBtn');

    // Body Background elements (global)
    const bodyBgColorPicker = document.getElementById('bodyBgColorPicker');
    const bodyBgAlpha = document.getElementById('bodyBgAlpha'); // New: Alpha for body background color
    const bodyBgImageUrl = document.getElementById('bodyBgImageUrl');
    const applyBodyBgImageBtn = document.getElementById('applyBodyBgImageBtn');
    const bodyBgImageUpload = document.getElementById('bodyBgImageUpload');
    const bodyBackgroundSize = document.getElementById('bodyBackgroundSize');
    const bodyBackgroundRepeat = document.getElementById('bodyBackgroundRepeat');
    const bodyBackgroundPosition = document.getElementById('bodyBackgroundPosition');
    const bodyBackgroundOpacity = document.getElementById('bodyBackgroundOpacity'); // Overall body opacity
    const bodyFilterBlur = document.getElementById('bodyFilterBlur');
    const bodyFilterGrayscale = document.getElementById('bodyFilterGrayscale');
    const bodyFilterBrightness = document.getElementById('bodyFilterBrightness');
    const bodyFilterContrast = document.getElementById('bodyFilterContrast');
    const bodyFilterSepia = document.getElementById('bodyFilterSepia');
    const bodyFilterHueRotate = document.getElementById('bodyFilterHueRotate');
    const bodyFilterInvert = document.getElementById('bodyFilterInvert');
    const bodyFilterSaturate = document.getElementById('bodyFilterSaturate');
    const bodyBackgroundAnimation = document.getElementById('bodyBackgroundAnimation');
    const bodyAnimationDuration = document.getElementById('bodyAnimationDuration');
    const clearBodyBgBtn = document.getElementById('clearBodyBgBtn');
    const resetBodyFiltersBtn = document.getElementById('resetBodyFiltersBtn');


    let currentElementId = 0;
    const createdElements = {};

    const bodyBackgroundSettings = {
        backgroundColor: '#e0f2f7', // Hex color
        bgAlpha: 1, // New: Alpha for body background color
        imageUrl: '',
        size: 'auto',
        repeat: 'no-repeat',
        position: 'center',
        opacity: 1, // Overall body opacity
        filters: {
            blur: 0, grayscale: 0, brightness: 100, contrast: 100,
            sepia: 0, hueRotate: 0, invert: 0, saturate: 100
        },
        animation: 'none',
        animationDuration: 10
    };

    let activeEditingElementId = null;

    // --- Utility Functions ---
    function showStatus(message, type = '') {
        if (statusMessage) {
            statusMessage.textContent = message;
            statusMessage.className = `status-message ${type}`;
            setTimeout(() => {
                statusMessage.textContent = '';
                statusMessage.className = 'status-message';
            }, 3000); // Clear message after 3 seconds
        }
    }

    // Helper to convert HEX to RGBA
    function hexToRgba(hex, alpha) {
        let r = 0, g = 0, b = 0;
        // Handle #RRGGBB or #RGB
        if (hex.length === 7) { // #RRGGBB
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        } else if (hex.length === 4) { // #RGB
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Helper to parse RGBA string into hex and alpha
    function parseRgba(rgbaString) {
        const parts = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*([\d.]+))?\)/);
        if (parts) {
            const r = parseInt(parts[1]);
            const g = parseInt(parts[2]);
            const b = parseInt(parts[3]);
            const a = parts[5] ? parseFloat(parts[5]) : 1; // Default to 1 if alpha is missing (rgb)
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            return { hex, alpha: a };
        }
        return { hex: '#000000', alpha: 1 }; // Default if parsing fails
    }

    function applyInitialSettingsToInputs() {
        if (elementPaddingUnit) elementPaddingUnit.value = 'rem';
        if (elementMarginUnit) elementMarginUnit.value = 'px';
        if (elementBorderStyle) elementBorderStyle.value = 'none';
        if (elementFontFamily) elementFontFamily.value = 'Inter, sans-serif';
        if (elementFontWeight) elementFontWeight.value = '600';
        if (elementTextAlign) elementTextAlign.value = 'center';
        // Set default alpha values for newly created elements
        if (elementBgAlpha) elementBgAlpha.value = 1;
        if (bodyBgAlpha) bodyBgAlpha.value = 1;
    }

    // --- Sidebar and Project Functions ---
    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
        if (mainContent && window.innerWidth > 768) {
            mainContent.classList.add('shifted');
        }
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        if (mainContent && window.innerWidth > 768) {
            mainContent.classList.remove('shifted');
        }
    }

    async function saveProject() {
        await waitForFirebase(); // Ensure Firebase is ready
        if (!currentUserId || !db) {
            showStatus('Ошибка: Пользователь не аутентифицирован или Firestore не инициализирован.', 'error');
            return;
        }

        showStatus('Сохранение проекта...', 'info');

        try {
            const projectData = {
                bodyBackground: bodyBackgroundSettings,
                elements: Object.values(createdElements).map(el => ({
                    id: el.element.id,
                    props: el.props
                }))
            };
            
            // Save project to Firestore
            const projectDocRef = window.firebaseServices.doc(db, 'artifacts', appId, 'users', currentUserId, 'projects', 'myProject');
            await window.firebaseServices.setDoc(projectDocRef, projectData);
            showStatus('Проект успешно сохранен!', 'success');
        } catch (error) {
            console.error("Error saving project:", error);
            showStatus(`Ошибка сохранения проекта: ${error.message}`, 'error');
        }
    }

    async function loadProject() {
        await waitForFirebase(); // Ensure Firebase is ready
        if (!currentUserId || !db) {
            showStatus('Ошибка: Пользователь не аутентифицирован или Firestore не инициализирован.', 'error');
            return;
        }

        showStatus('Загрузка проекта...', 'info');

        try {
            const projectDocRef = window.firebaseServices.doc(db, 'artifacts', appId, 'users', currentUserId, 'projects', 'myProject');
            const docSnap = await window.firebaseServices.getDoc(projectDocRef);

            if (docSnap.exists()) {
                const projectData = docSnap.data();
                
                // Clear existing elements
                Object.values(createdElements).forEach(el => {
                    if (el.element && el.element.parentNode) {
                        el.element.parentNode.removeChild(el.element);
                    }
                });
                for (const key in createdElements) {
                    delete createdElements[key];
                }
                currentElementId = 0; // Reset ID counter

                // Load Body Background Settings
                Object.assign(bodyBackgroundSettings, projectData.bodyBackground);
                // Ensure bgAlpha is loaded, default to 1 if not present in old saves
                if (bodyBackgroundSettings.bgAlpha === undefined) bodyBackgroundSettings.bgAlpha = 1;

                applyBodyBackgroundStyles();
                // Update Body UI inputs
                if (bodyBgColorPicker) {
                    const { hex, alpha } = parseRgba(bodyBackgroundSettings.backgroundColor);
                    bodyBgColorPicker.value = hex;
                    bodyBackgroundSettings.backgroundColor = hex; // Store as hex
                    if (bodyBgAlpha) bodyBgAlpha.value = alpha;
                    bodyBackgroundSettings.bgAlpha = alpha; // Store alpha
                }
                if (bodyBgImageUrl) bodyBgImageUrl.value = bodyBackgroundSettings.imageUrl;
                if (bodyBackgroundSize) bodyBackgroundSize.value = bodyBackgroundSettings.size;
                if (bodyBackgroundRepeat) bodyBackgroundRepeat.value = bodyBackgroundSettings.repeat;
                if (bodyBackgroundPosition) bodyBackgroundPosition.value = bodyBackgroundSettings.position;
                if (bodyBackgroundOpacity) bodyBackgroundOpacity.value = bodyBackgroundSettings.opacity;
                if (bodyFilterBlur) bodyFilterBlur.value = bodyBackgroundSettings.filters.blur;
                if (bodyFilterGrayscale) bodyFilterGrayscale.value = bodyBackgroundSettings.filters.grayscale;
                if (bodyFilterBrightness) bodyFilterBrightness.value = bodyBackgroundSettings.filters.brightness;
                if (bodyFilterContrast) bodyFilterContrast.value = bodyBackgroundSettings.filters.contrast;
                if (bodyFilterSepia) bodyFilterSepia.value = bodyBackgroundSettings.filters.sepia;
                if (bodyFilterHueRotate) bodyFilterHueRotate.value = bodyBackgroundSettings.filters.hueRotate;
                if (bodyFilterInvert) bodyFilterInvert.value = bodyBackgroundSettings.filters.invert;
                if (bodyFilterSaturate) bodyFilterSaturate.value = bodyBackgroundSettings.filters.saturate;
                if (bodyBackgroundAnimation) bodyBackgroundAnimation.value = bodyBackgroundSettings.animation;
                if (bodyAnimationDuration) bodyAnimationDuration.value = bodyBackgroundSettings.animationDuration;


                // Recreate elements
                projectData.elements.forEach(savedElement => {
                    const newElement = document.createElement('div');
                    newElement.id = savedElement.id;
                    newElement.className = 'designer-element';
                    
                    if (mainContent) {
                        mainContent.appendChild(newElement);
                    }

                    // Ensure bgAlpha is loaded, default to 1 if not present in old saves
                    if (savedElement.props.bgAlpha === undefined) savedElement.props.bgAlpha = 1;
                    // Ensure width/height are loaded as strings for '100%' if applicable
                    if (typeof savedElement.props.width === 'number' && savedElement.props.width === 0) savedElement.props.width = 'auto';
                    if (typeof savedElement.props.height === 'number' && savedElement.props.height === 0) savedElement.props.height = 'auto';


                    createdElements[savedElement.id] = {
                        element: newElement,
                        props: savedElement.props
                    };
                    // Ensure currentElementId is updated to avoid ID collisions
                    const idNum = parseInt(savedElement.id.replace('designerElement-', ''));
                    if (idNum >= currentElementId) {
                        currentElementId = idNum + 1;
                    }

                    applyElementSettings(savedElement.id); // Apply loaded properties
                    attachElementListeners(newElement, savedElement.id); // Reattach listeners
                });

                showStatus('Проект успешно загружен!', 'success');
                updateEmptyMessageVisibility();
                updateGeneratedCode();
            } else {
                showStatus('Проект не найден.', 'info');
            }
        } catch (error) {
            console.error("Error loading project:", error);
            showStatus(`Ошибка загрузки проекта: ${error.message}`, 'error');
        }
    }

    // --- Element Functions ---
    function updateEmptyMessageVisibility() {
        if (emptyContentMessage) {
            const hasElements = Object.keys(createdElements).length > 0;
            emptyContentMessage.style.display = hasElements ? 'none' : 'flex';
        }
    }

    function createDraggableResizableElement() {
        currentElementId++;
        const elementId = `designerElement-${currentElementId}`;
        const newElement = document.createElement('div');
        newElement.id = elementId;
        newElement.className = 'designer-element';

        const mainContentRect = mainContent ? mainContent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
        const defaultElementWidth = 100;
        const defaultElementHeight = 40;

        const initialLeft = (mainContentRect.width / 2) - (defaultElementWidth / 2);
        const initialTop = (mainContentRect.height / 2) - (defaultElementHeight / 2);

        createdElements[elementId] = {
            element: newElement,
            props: {
                text: `Элемент ${currentElementId}`,
                zIndex: 1,
                bgColor: '#6366f1', // Hex color
                bgAlpha: 1, // New: Alpha for element background color
                imageUrl: '',
                bgSize: 'auto',
                bgRepeat: 'no-repeat',
                bgPosition: 'center',
                opacity: 1, // Overall element opacity
                filters: {
                    blur: 0, grayscale: 0, brightness: 100, contrast: 100,
                    sepia: 0, hueRotate: 0, invert: 0, saturate: 100
                },
                animation: 'none',
                animationDuration: 10,
                textColor: '#ffffff',
                border: 'none',
                borderStyle: 'none', // Default border style
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                letterSpacing: 0,
                textAlign: 'center',
                textShadow: { color: 'rgba(0,0,0,0)', blur: 0, offsetX: 0, offsetY: 0 },
                boxShadow: { color: 'rgba(0,0,0,0.2)', blur: 10, spread: 0, offsetX: 0, offsetY: 3 },
                padding: { top: 0.7, right: 1.2, bottom: 0.7, left: 1.2, unit: 'rem' },
                margin: { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' },
                width: 'auto', // Now stores 'auto' or '100%' or px value as string
                height: 'auto', // Now stores 'auto' or '100%' or px value as string
                left: Math.max(0, initialLeft),
                top: Math.max(0, initialTop),
            }
        };

        if (mainContent) {
            mainContent.appendChild(newElement);
        } else {
            console.error('mainContent not found, could not add element.');
            return;
        }

        applyElementSettings(elementId);
        attachElementListeners(newElement, elementId);
        updateGeneratedCode();
        updateEmptyMessageVisibility();
        selectElement(elementId); // Select the new element and open its settings
    }

    function selectElement(elementId) {
        document.querySelectorAll('.designer-element.selected').forEach(el => {
            el.classList.remove('selected');
        });

        activeEditingElementId = elementId;
        const elementData = createdElements[elementId];
        if (elementData && elementData.element) {
            elementData.element.classList.add('selected');
        }

        openElementSettings(elementId);
    }

    function applyElementSettings(elementId) {
        const elementProps = createdElements[elementId].props;
        const elementDOM = createdElements[elementId].element;

        if (!elementDOM) return;

        // Apply properties via CSS variables for dynamic updates
        elementDOM.style.setProperty('--element-z-index', elementProps.zIndex);
        elementDOM.style.setProperty('--element-bg-color', hexToRgba(elementProps.bgColor, elementProps.bgAlpha)); // Use RGBA for background color
        elementDOM.style.setProperty('--element-bg-image', elementProps.imageUrl ? `url('${elementProps.imageUrl}')` : 'none');
        elementDOM.style.setProperty('--element-bg-size', elementProps.bgSize);
        elementDOM.style.setProperty('--element-bg-repeat', elementProps.bgRepeat);
        elementDOM.style.setProperty('--element-bg-position', elementProps.bgPosition);
        elementDOM.style.setProperty('--element-opacity', elementProps.opacity); // Overall opacity

        const filters = elementProps.filters;
        const filterString = `blur(${filters.blur}px) ` +
                             `grayscale(${filters.grayscale}%) ` +
                             `brightness(${filters.brightness}%) ` +
                             `contrast(${filters.contrast}%) ` +
                             `sepia(${filters.sepia}%) ` +
                             `hue-rotate(${filters.hueRotate}deg) ` +
                             `invert(${filters.invert}%) ` +
                             `saturate(${filters.saturate}%)`;
        elementDOM.style.filter = filterString; // Direct application for immediate effect

        // Apply animation
        elementDOM.classList.remove('animated-pan', 'animated-zoom'); // Clear previous
        elementDOM.style.animationDuration = '0s'; // Reset duration first

        if (elementProps.animation !== 'none') {
            elementDOM.classList.add(`animated-${elementProps.animation}`);
            elementDOM.style.animationDuration = `${elementProps.animationDuration}s`;
        }

        elementDOM.style.setProperty('--element-text-color', elementProps.textColor);
        elementDOM.style.setProperty('--element-border', elementProps.border);
        elementDOM.style.setProperty('--element-border-style', elementProps.borderStyle);
        elementDOM.style.setProperty('--element-border-radius', `${elementProps.borderRadius}px`);
        elementDOM.style.setProperty('--element-font-size', `${elementProps.fontSize}px`);
        elementDOM.style.setProperty('--element-font-family', elementProps.fontFamily);
        elementDOM.style.setProperty('--element-font-weight', elementProps.fontWeight);
        elementDOM.style.setProperty('--element-letter-spacing', `${elementProps.letterSpacing}px`);
        elementDOM.style.setProperty('--element-text-align', elementProps.textAlign);

        // Text Shadow
        const ts = elementProps.textShadow;
        const textShadowString = `${ts.offsetX}px ${ts.offsetY}px ${ts.blur}px ${ts.color}`;
        elementDOM.style.setProperty('--element-text-shadow', textShadowString);
        elementDOM.style.textShadow = textShadowString; // Direct application

        // Box Shadow
        const bs = elementProps.boxShadow;
        const boxShadowString = `${bs.offsetX}px ${bs.offsetY}px ${bs.blur}px ${bs.spread}px ${bs.color}`;
        elementDOM.style.setProperty('--element-box-shadow', boxShadowString);
        elementDOM.style.boxShadow = boxShadowString; // Direct application

        // Padding
        elementDOM.style.setProperty('--element-padding-top', `${elementProps.padding.top}${elementProps.padding.unit}`);
        elementDOM.style.setProperty('--element-padding-right', `${elementProps.padding.right}${elementProps.padding.unit}`);
        elementDOM.style.setProperty('--element-padding-bottom', `${elementProps.padding.bottom}${elementProps.padding.unit}`);
        elementDOM.style.setProperty('--element-padding-left', `${elementProps.padding.left}${elementProps.padding.unit}`);
        elementDOM.style.padding = `${elementProps.padding.top}${elementProps.padding.unit} ${elementProps.padding.right}${elementProps.padding.unit} ${elementProps.padding.bottom}${elementProps.padding.unit} ${elementProps.padding.left}${elementProps.padding.unit}`; // Direct application

        // Margin
        elementDOM.style.setProperty('--element-margin-top', `${elementProps.margin.top}${elementProps.margin.unit}`);
        elementDOM.style.setProperty('--element-margin-right', `${elementProps.margin.right}${elementProps.margin.unit}`);
        elementDOM.style.setProperty('--element-margin-bottom', `${elementProps.margin.bottom}${elementProps.margin.unit}`);
        elementDOM.style.setProperty('--element-margin-left', `${elementProps.margin.left}${elementProps.margin.unit}`);
        elementDOM.style.margin = `${elementProps.margin.top}${elementProps.margin.unit} ${elementProps.margin.right}${elementProps.margin.unit} ${elementProps.margin.bottom}${elementProps.margin.unit} ${elementProps.margin.left}${elementProps.margin.unit}`; // Direct application

        // Width and Height
        elementDOM.style.width = elementProps.width; // Can be 'auto', '100%', or 'Npx'
        elementDOM.style.height = elementProps.height; // Can be 'auto', '100%', or 'Npx'


        // Update content (text or image)
        while (elementDOM.firstChild) {
            elementDOM.removeChild(elementDOM.firstChild);
        }
        if (elementProps.imageUrl && elementProps.bgSize === 'auto') {
            const img = document.createElement('img');
            img.src = elementProps.imageUrl;
            img.onerror = () => {
                img.remove();
                elementDOM.textContent = elementProps.text;
                elementProps.imageUrl = '';
                applyElementSettings(elementId);
            };
            elementDOM.appendChild(img);
        } else {
            elementDOM.textContent = elementProps.text;
        }

        // Re-add resize handle
        let resizeHandle = elementDOM.querySelector('.resize-handle');
        // Only show resize handle if width/height are not 100%
        if (elementProps.width === 'auto' && elementProps.height === 'auto' || (elementProps.width !== '100%' && elementProps.height !== '100%')) {
             if (!resizeHandle) {
                resizeHandle = document.createElement('div');
                resizeHandle.className = 'resize-handle';
                elementDOM.appendChild(resizeHandle);
                attachResizeListeners(resizeHandle, elementDOM, elementId);
            }
        } else {
            if (resizeHandle) {
                resizeHandle.remove();
            }
        }


        // Ensure position is valid after size/padding/margin changes
        requestAnimationFrame(() => {
            if (!elementDOM || !mainContent) return;
            let newLeft = elementDOM.offsetLeft;
            let newTop = elementDOM.offsetTop;
            
            const mainContentRect = mainContent.getBoundingClientRect();
            
            // Adjust position if element goes beyond bounds
            if (elementProps.width === 'auto' || elementProps.width.endsWith('px')) {
                newLeft = Math.max(0, Math.min(newLeft, mainContentRect.width - elementDOM.offsetWidth));
            } else if (elementProps.width === '100%') {
                newLeft = 0; // If 100% width, snap to left edge
            }
            if (elementProps.height === 'auto' || elementProps.height.endsWith('px')) {
                newTop = Math.max(0, Math.min(newTop, mainContentRect.height - elementDOM.offsetHeight));
            } else if (elementProps.height === '100%') {
                newTop = 0; // If 100% height, snap to top edge
            }

            elementDOM.style.left = `${newLeft}px`;
            elementDOM.style.top = `${newTop}px`;
            
            elementProps.left = newLeft;
            elementProps.top = newTop;
            
            updateGeneratedCode();
        });
    }

    function attachElementListeners(element, elementId) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        let lastTapTime = 0;

        const startDrag = (e) => {
            if (e.target.classList.contains('resize-handle')) {
                return;
            }
            selectElement(elementId);
            isDragging = true;
            element.classList.add('dragging');
            
            const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
            
            initialLeft = element.offsetLeft;
            initialTop = element.offsetTop;
            startX = clientX;
            startY = clientY;
            e.preventDefault(); // Prevent default touch behavior (scrolling)
        };

        const drag = (e) => {
            if (!isDragging || !mainContent) return;
            
            const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
            
            let newLeft = initialLeft + (clientX - startX);
            let newTop = initialTop + (clientY - startY);

            const mainContentRect = mainContent.getBoundingClientRect();
            // Constrain to mainContent bounds
            newLeft = Math.max(0, Math.min(newLeft, mainContentRect.width - element.offsetWidth));
            newTop = Math.max(0, Math.min(newTop, mainContentRect.height - element.offsetHeight));

            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;

            createdElements[elementId].props.left = newLeft;
            createdElements[elementId].props.top = newTop;
            updateGeneratedCode();
        };

        const endDrag = () => {
            isDragging = false;
            element.classList.remove('dragging');
        };

        element.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        element.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', endDrag);

        element.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            openElementSettings(elementId);
        });

        element.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTapTime;

            if (tapLength < 300 && tapLength > 0) { // Double tap detected
                e.preventDefault();
                openElementSettings(elementId);
                lastTapTime = 0;
            } else {
                lastTapTime = currentTime;
            }
        });

        element.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent mainContent click from deselecting
            selectElement(elementId);
        });

        const resizeHandle = element.querySelector('.resize-handle');
        if (resizeHandle) {
            attachResizeListeners(resizeHandle, element, elementId);
        }
    }

    function attachResizeListeners(resizeHandle, element, elementId) {
        let isResizing = false;
        let startX, startY, initialWidth, initialHeight, initialLeft, initialTop;

        const startResize = (e) => {
            isResizing = true;
            const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

            startX = clientX;
            startY = clientY;
            initialWidth = element.offsetWidth;
            initialHeight = element.offsetHeight;
            initialLeft = element.offsetLeft;
            initialTop = element.offsetTop;

            e.stopPropagation();
            e.preventDefault();
        };

        const resize = (e) => {
            if (!isResizing || !mainContent) return;
            const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

            let newWidth = initialWidth + (clientX - startX);
            let newHeight = initialHeight + (clientY - startY);

            newWidth = Math.max(50, newWidth); // Minimum size
            newHeight = Math.max(35, newHeight); // Minimum size

            const mainContentRect = mainContent.getBoundingClientRect();
            // Constrain to mainContent bounds
            const maxPossibleWidth = mainContentRect.width - initialLeft;
            const maxPossibleHeight = mainContentRect.height - initialTop;

            newWidth = Math.min(newWidth, maxPossibleWidth);
            newHeight = Math.min(newHeight, maxPossibleHeight);

            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`;

            createdElements[elementId].props.width = `${newWidth}px`; // Store as 'Npx' string
            createdElements[elementId].props.height = `${newHeight}px`; // Store as 'Npx' string
            updateGeneratedCode();
        };

        const endResize = () => {
            isResizing = false;
        };

        resizeHandle.addEventListener('mousedown', startResize);
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', endResize);

        resizeHandle.addEventListener('touchstart', startResize, { passive: false });
        document.addEventListener('touchmove', resize, { passive: false });
        document.addEventListener('touchend', endResize);
    }


    // --- Element Settings Modal Functions ---
    function openElementSettings(elementId) {
        activeEditingElementId = elementId;
        const elementProps = createdElements[elementId].props;

        if (!elementSettingsModal || !elementText) {
            console.error('One or more element settings modal elements not found.');
            return;
        }
        
        // Populate inputs with current element properties
        elementText.value = elementProps.text;
        // LLM related
        if (geminiPrompt) geminiPrompt.value = ''; // Clear prompt field when opening
        if (geminiLoading) geminiLoading.classList.add('hidden'); // Hide loading
        if (geminiError) geminiError.textContent = ''; // Clear error

        elementZIndex.value = elementProps.zIndex;
        // Background Color with Alpha
        if (elementBgColor) elementBgColor.value = elementProps.bgColor; // Hex
        if (elementBgAlpha) elementBgAlpha.value = elementProps.bgAlpha; // Alpha

        elementImageUrl.value = elementProps.imageUrl;
        elementBackgroundSize.value = elementProps.bgSize;
        elementBackgroundRepeat.value = elementProps.bgRepeat;
        elementBackgroundPosition.value = elementProps.bgPosition;
        elementOpacity.value = elementProps.opacity;

        // Filters
        elementFilterBlur.value = elementProps.filters.blur;
        elementFilterGrayscale.value = elementProps.filters.grayscale;
        elementFilterBrightness.value = elementProps.filters.brightness;
        elementFilterContrast.value = elementProps.filters.contrast;
        elementFilterSepia.value = elementProps.filters.sepia;
        elementFilterHueRotate.value = elementProps.filters.hueRotate;
        elementFilterInvert.value = elementProps.filters.invert;
        elementFilterSaturate.value = elementProps.filters.saturate;

        // Animation
        elementBackgroundAnimation.value = elementProps.animation;
        elementAnimationDuration.value = elementProps.animationDuration;

        elementTextColor.value = elementProps.textColor;
        elementBorder.value = elementProps.border;
        elementBorderStyle.value = elementBorderStyle.value;
        elementBorderRadius.value = elementProps.borderRadius;
        elementFontSize.value = elementProps.fontSize;
        elementFontFamily.value = elementProps.fontFamily;
        elementFontWeight.value = elementProps.fontWeight;
        elementLetterSpacing.value = elementProps.letterSpacing;
        elementTextAlign.value = elementProps.textAlign;
        // Width and Height: Display actual value or empty string for 'auto'/'100%'
        elementWidth.value = elementProps.width.endsWith('px') ? parseInt(elementProps.width) : '';
        elementHeight.value = elementProps.height.endsWith('px') ? parseInt(elementProps.height) : '';

        // Text Shadow
        elementTextShadowColor.value = elementProps.textShadow.color;
        elementTextShadowBlur.value = elementProps.textShadow.blur;
        elementTextShadowOffsetX.value = elementProps.textShadow.offsetX;
        elementTextShadowOffsetY.value = elementProps.textShadow.offsetY;

        // Box Shadow
        elementBoxShadowColor.value = elementProps.boxShadow.color;
        elementBoxShadowOffsetX.value = elementProps.boxShadow.offsetX;
        elementBoxShadowOffsetY.value = elementProps.boxShadow.offsetY;
        elementBoxShadowBlur.value = elementProps.boxShadow.blur;
        elementBoxShadowSpread.value = elementProps.boxShadow.spread;

        // Padding
        elementPaddingTop.value = elementProps.padding.top;
        elementPaddingRight.value = elementProps.padding.right;
        elementPaddingBottom.value = elementProps.padding.bottom;
        elementPaddingLeft.value = elementProps.padding.left;
        elementPaddingUnit.value = elementProps.padding.unit;

        // Margin
        elementMarginTop.value = elementProps.margin.top;
        elementMarginRight.value = elementProps.margin.right;
        elementMarginBottom.value = elementProps.margin.bottom;
        elementMarginLeft.value = elementProps.margin.left;
        elementMarginUnit.value = elementProps.margin.unit;

        elementSettingsModal.style.display = 'flex';
    }

    function closeElementSettings() {
        if (elementSettingsModal) {
            elementSettingsModal.style.display = 'none';
        }
        document.querySelectorAll('.designer-element.selected').forEach(el => {
            el.classList.remove('selected');
        });
        activeEditingElementId = null;
        // Clear LLM related fields and status when closing modal
        if (geminiPrompt) geminiPrompt.value = '';
        if (geminiLoading) geminiLoading.classList.add('hidden');
        if (geminiError) geminiError.textContent = '';
    }

    function saveElementSettings() {
        if (!activeEditingElementId) return;

        const elementProps = createdElements[activeEditingElementId].props;
        
        // Update properties from inputs
        elementProps.text = elementText.value;
        elementProps.zIndex = parseInt(elementZIndex.value) || 1;
        elementProps.bgColor = elementBgColor.value; // Store hex
        elementProps.bgAlpha = parseFloat(elementBgAlpha.value); // Store alpha
        elementProps.imageUrl = elementImageUrl.value;
        elementProps.bgSize = elementBackgroundSize.value;
        elementProps.bgRepeat = elementBackgroundRepeat.value;
        elementProps.bgPosition = elementBackgroundPosition.value;
        elementProps.opacity = parseFloat(elementOpacity.value);

        // Filters
        elementProps.filters.blur = parseFloat(elementFilterBlur.value);
        elementProps.filters.grayscale = parseFloat(elementFilterGrayscale.value);
        elementProps.filters.brightness = parseFloat(elementFilterBrightness.value);
        elementProps.filters.contrast = parseFloat(elementFilterContrast.value);
        elementProps.filters.sepia = parseFloat(elementFilterSepia.value);
        elementProps.filters.hueRotate = parseFloat(elementFilterHueRotate.value);
        elementProps.filters.invert = parseFloat(elementFilterInvert.value);
        elementProps.filters.saturate = parseFloat(elementFilterSaturate.value);

        // Animation
        elementProps.animation = elementBackgroundAnimation.value;
        elementProps.animationDuration = parseFloat(elementAnimationDuration.value) || 10;

        elementProps.textColor = elementTextColor.value;
        elementProps.border = elementBorder.value;
        elementProps.borderStyle = elementBorderStyle.value;
        elementProps.borderRadius = parseInt(elementBorderRadius.value) || 0;
        elementProps.fontSize = parseInt(elementFontSize.value) || 14;
        elementProps.fontFamily = elementFontFamily.value;
        elementProps.fontWeight = elementFontWeight.value;
        elementProps.letterSpacing = parseFloat(elementLetterSpacing.value) || 0;
        elementProps.textAlign = elementTextAlign.value;
        // Width and Height: Convert empty string to 'auto', otherwise px or '%' string
        elementProps.width = elementWidth.value === '' ? 'auto' : `${parseInt(elementWidth.value)}px`;
        elementProps.height = elementHeight.value === '' ? 'auto' : `${parseInt(elementHeight.value)}px`;

        // Text Shadow
        elementProps.textShadow.color = elementTextShadowColor.value;
        elementProps.textShadow.blur = parseFloat(elementTextShadowBlur.value) || 0;
        elementProps.textShadow.offsetX = parseFloat(elementTextShadowOffsetX.value) || 0;
        elementProps.textShadow.offsetY = parseFloat(elementTextShadowOffsetY.value) || 0;

        // Box Shadow
        elementProps.boxShadow.color = elementBoxShadowColor.value;
        elementProps.boxShadow.offsetX = parseFloat(elementBoxShadowOffsetX.value) || 0;
        elementProps.boxShadow.offsetY = parseFloat(elementBoxShadowOffsetY.value) || 0;
        elementProps.boxShadow.blur = parseFloat(elementBoxShadowBlur.value) || 0;
        elementProps.boxShadow.spread = parseFloat(elementBoxShadowSpread.value) || 0;

        // Padding
        elementProps.padding.top = parseFloat(elementPaddingTop.value) || 0;
        elementProps.padding.right = parseFloat(elementPaddingRight.value) || 0;
        elementProps.padding.bottom = parseFloat(elementPaddingBottom.value) || 0;
        elementProps.padding.left = parseFloat(elementPaddingLeft.value) || 0;
        elementProps.padding.unit = elementPaddingUnit.value;

        // Margin
        elementProps.margin.top = parseFloat(elementMarginTop.value) || 0;
        elementProps.margin.right = parseFloat(elementMarginRight.value) || 0;
        elementProps.margin.bottom = parseFloat(elementMarginBottom.value) || 0;
        elementProps.margin.left = parseFloat(elementMarginLeft.value) || 0;
        elementProps.margin.unit = elementMarginUnit.value;


        applyElementSettings(activeEditingElementId);
        closeElementSettings();
    }

    function deleteElement() {
        if (!activeEditingElementId) return;

        const elementDOM = createdElements[activeEditingElementId].element;
        if (elementDOM && elementDOM.parentNode) {
            elementDOM.parentNode.removeChild(elementDOM);
        }
        delete createdElements[activeEditingElementId];
        updateGeneratedCode();
        updateEmptyMessageVisibility();
        closeElementSettings();
    }

    function resetElementFilters() {
        if (!activeEditingElementId) return;
        const elementProps = createdElements[activeEditingElementId].props;
        elementProps.filters = {
            blur: 0, grayscale: 0, brightness: 100, contrast: 100,
            sepia: 0, hueRotate: 0, invert: 0, saturate: 100
        };
        // Update UI inputs
        if (elementFilterBlur) elementFilterBlur.value = 0;
        if (elementFilterGrayscale) elementFilterGrayscale.value = 0;
        if (elementFilterBrightness) elementFilterBrightness.value = 100;
        if (elementFilterContrast) elementFilterContrast.value = 100;
        if (elementFilterSepia) elementFilterSepia.value = 0;
        if (elementFilterHueRotate) elementFilterHueRotate.value = 0;
        if (elementFilterInvert) elementFilterInvert.value = 0;
        if (elementFilterSaturate) elementFilterSaturate.value = 100;
        applyElementSettings(activeEditingElementId);
    }

    function resetElementTextShadow() {
        if (!activeEditingElementId) return;
        const elementProps = createdElements[activeEditingElementId].props;
        elementProps.textShadow = { color: 'rgba(0,0,0,0)', blur: 0, offsetX: 0, offsetY: 0 };
        if (elementTextShadowColor) elementTextShadowColor.value = '#000000'; // Default black for color picker
        if (elementTextShadowBlur) elementTextShadowBlur.value = 0;
        if (elementTextShadowOffsetX) elementTextShadowOffsetX.value = 0;
        if (elementTextShadowOffsetY) elementTextShadowOffsetY.value = 0;
        applyElementSettings(activeEditingElementId);
    }

    function resetElementBoxShadow() {
        if (!activeEditingElementId) return;
        const elementProps = createdElements[activeEditingElementId].props;
        elementProps.boxShadow = { color: 'rgba(0,0,0,0.2)', blur: 10, spread: 0, offsetX: 0, offsetY: 3 };
        if (elementBoxShadowColor) elementBoxShadowColor.value = '#000000';
        if (elementBoxShadowOffsetX) elementBoxShadowOffsetX.value = 0;
        if (elementBoxShadowOffsetY) elementBoxShadowOffsetY.value = 3;
        if (elementBoxShadowBlur) elementBoxShadowBlur.value = 10;
        if (elementBoxShadowSpread) elementBoxShadowSpread.value = 0;
        applyElementSettings(activeEditingElementId);
    }

    function resetElementMargin() {
        if (!activeEditingElementId) return;
        const elementProps = createdElements[activeEditingElementId].props;
        elementProps.margin = { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' };
        if (elementMarginTop) elementMarginTop.value = 0;
        if (elementMarginRight) elementMarginRight.value = 0;
        if (elementMarginBottom) elementMarginBottom.value = 0;
        if (elementMarginLeft) elementMarginLeft.value = 0;
        if (elementMarginUnit) elementMarginUnit.value = 'px';
        applyElementSettings(activeEditingElementId);
    }

    function resetElementPadding() {
        if (!activeEditingElementId) return;
        const elementProps = createdElements[activeEditingElementId].props;
        elementProps.padding = { top: 0.7, right: 1.2, bottom: 0.7, left: 1.2, unit: 'rem' };
        if (elementPaddingTop) elementPaddingTop.value = 0.7;
        if (elementPaddingRight) elementPaddingRight.value = 1.2;
        if (elementPaddingBottom) elementPaddingBottom.value = 0.7;
        if (elementPaddingLeft) elementPaddingLeft.value = 1.2;
        if (elementPaddingUnit) elementPaddingUnit.value = 'rem';
        applyElementSettings(activeEditingElementId);
    }

    // --- Body Background Functions (global) ---
    function applyBodyBackgroundStyles() {
        if (!document.body) return;

        const bodyStyle = document.body.style;
        const bbs = bodyBackgroundSettings;

        bodyStyle.setProperty('--body-background-color', hexToRgba(bbs.backgroundColor, bbs.bgAlpha)); // Use RGBA for body background color
        bodyStyle.setProperty('--body-background-image', bbs.imageUrl ? `url('${bbs.imageUrl}')` : 'none');
        bodyStyle.setProperty('--body-background-size', bbs.size);
        bodyStyle.setProperty('--body-background-repeat', bbs.repeat);
        bodyStyle.setProperty('--body-background-position', bbs.position);
        bodyStyle.setProperty('--body-background-opacity', bbs.opacity); // Overall body opacity

        const filters = bbs.filters;
        const filterString = `blur(${filters.blur}px) ` +
                             `grayscale(${filters.grayscale}%) ` +
                             `brightness(${filters.brightness}%) ` +
                             `contrast(${filters.contrast}%) ` +
                             `sepia(${filters.sepia}%) ` +
                             `hue-rotate(${filters.hueRotate}deg) ` +
                             `invert(${filters.invert}%) ` +
                             `saturate(${filters.saturate}%)`;
        bodyStyle.setProperty('--body-filter-blur', `${filters.blur}px`);
        bodyStyle.setProperty('--body-filter-grayscale', `${filters.grayscale}%`);
        bodyStyle.setProperty('--body-filter-brightness', `${filters.brightness}%`);
        bodyStyle.setProperty('--body-filter-contrast', `${filters.contrast}%`);
        bodyStyle.setProperty('--body-filter-sepia', `${filters.sepia}%`);
        bodyStyle.setProperty('--body-filter-hue-rotate', `${filters.hueRotate}deg`);
        bodyStyle.setProperty('--body-filter-invert', `${filters.invert}%`);
        bodyStyle.setProperty('--body-filter-saturate', `${filters.saturate}%`);
        bodyStyle.filter = filterString;

        document.body.classList.remove('animated-pan', 'animated-zoom');
        document.body.style.animationDuration = '0s';

        if (bbs.animation !== 'none') {
            document.body.classList.add(`animated-${bbs.animation}`);
            document.body.style.animationDuration = `${bbs.animationDuration}s`;
        }
        
        updateGeneratedCode();
    }

    function clearBodyBackground() {
        bodyBackgroundSettings.imageUrl = '';
        bodyBackgroundSettings.size = 'auto';
        bodyBackgroundSettings.repeat = 'no-repeat';
        bodyBackgroundSettings.position = 'center';
        bodyBackgroundSettings.backgroundColor = '#e0f2f7';
        bodyBackgroundSettings.bgAlpha = 1; // Reset alpha too
        bodyBackgroundSettings.opacity = 1;
        bodyBackgroundSettings.animation = 'none';
        bodyBackgroundSettings.animationDuration = 10;

        // Update UI
        if (bodyBgImageUrl) bodyBgImageUrl.value = '';
        if (bodyBgImageUpload) bodyBgImageUpload.value = '';
        if (bodyBackgroundSize) bodyBackgroundSize.value = 'auto';
        if (bodyBackgroundRepeat) bodyBackgroundRepeat.value = 'no-repeat';
        if (bodyBackgroundPosition) bodyBackgroundPosition.value = 'center';
        if (bodyBgColorPicker) bodyBgColorPicker.value = '#e0f2f7';
        if (bodyBgAlpha) bodyBgAlpha.value = 1;
        if (bodyBackgroundOpacity) bodyBackgroundOpacity.value = 1;
        if (bodyBackgroundAnimation) bodyBackgroundAnimation.value = 'none';
        if (bodyAnimationDuration) bodyAnimationDuration.value = 10;

        applyBodyBackgroundStyles();
        resetBodyFilters();
    }

    function resetBodyFilters() {
        bodyBackgroundSettings.filters = {
            blur: 0, grayscale: 0, brightness: 100, contrast: 100,
            sepia: 0, hueRotate: 0, invert: 0, saturate: 100
        };

        // Update UI inputs for filters
        if (bodyFilterBlur) bodyFilterBlur.value = 0;
        if (bodyFilterGrayscale) bodyFilterGrayscale.value = 0;
        if (bodyFilterBrightness) bodyFilterBrightness.value = 100;
        if (bodyFilterContrast) bodyFilterContrast.value = 100;
        if (bodyFilterSepia) bodyFilterSepia.value = 0;
        if (bodyFilterHueRotate) bodyFilterHueRotate.value = 0;
        if (bodyFilterInvert) bodyFilterInvert.value = 0;
        if (bodyFilterSaturate) bodyFilterSaturate.value = 100;

        applyBodyBackgroundStyles();
    }

    // --- Gemini API Integration ---
    async function generateTextForElement() {
        if (!activeEditingElementId) {
            geminiError.textContent = 'Выберите элемент для генерации текста.';
            return;
        }

        const prompt = geminiPrompt.value.trim();
        if (!prompt) {
            geminiError.textContent = 'Введите запрос для генерации текста.';
            return;
        }

        geminiLoading.classList.remove('hidden');
        geminiError.textContent = '';
        geminiPrompt.disabled = true;
        generateTextBtn.disabled = true;

        let retries = 0;
        const maxRetries = 5;
        const baseDelay = 1000; // 1 second

        const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas will provide this

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        while (retries < maxRetries) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    if (response.status === 429 && retries < maxRetries - 1) {
                        const delay = baseDelay * Math.pow(2, retries) + Math.random() * 500;
                        console.warn(`Rate limit hit. Retrying in ${delay / 1000}s...`);
                        await new Promise(res => setTimeout(res, delay));
                        retries++;
                        continue;
                    } else {
                        const errorData = await response.json();
                        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.error.message || 'Unknown error'}`);
                    }
                }

                const result = await response.json();
                
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const generatedText = result.candidates[0].content.parts[0].text;
                    elementText.value = generatedText; // Update text input in modal
                    if (activeEditingElementId) {
                        createdElements[activeEditingElementId].props.text = generatedText;
                        applyElementSettings(activeEditingElementId); // Apply changes to element
                    }
                    geminiError.textContent = '';
                    showStatus('Текст сгенерирован!', 'success');
                    break;
                } else {
                    throw new Error("Не удалось сгенерировать текст. Неожиданная структура ответа.");
                }
            } catch (error) {
                console.error("Gemini API call failed:", error);
                geminiError.textContent = `Ошибка генерации: ${error.message}`;
                retries++;
                if (retries < maxRetries) {
                    const delay = baseDelay * Math.pow(2, retries) + Math.random() * 500;
                    console.warn(`Retrying in ${delay / 1000}s...`);
                    await new Promise(res => setTimeout(res, delay));
                } else {
                    showStatus('Превышено количество попыток генерации текста.', 'error');
                }
            }
        }

        geminiLoading.classList.add('hidden');
        geminiPrompt.disabled = false;
        generateTextBtn.disabled = false;
    }


    // --- Code Generation ---
    function updateGeneratedCode() {
        let htmlCode = '';
        let cssCode = '';
        
        const bbs = bodyBackgroundSettings;
        const bodyFilterString = `blur(${bbs.filters.blur}px) ` +
                                 `grayscale(${bbs.filters.grayscale}%) ` +
                                 `brightness(${bbs.filters.brightness}%) ` +
                                 `contrast(${bbs.filters.contrast}%) ` +
                                 `sepia(${bbs.filters.sepia}%) ` +
                                 `hue-rotate(${bbs.filters.hueRotate}deg) ` +
                                 `invert(${bbs.filters.invert}%) ` +
                                 `saturate(${bbs.filters.saturate}%)`;

        // CSS for <body> (page background)
        cssCode += `/* Styles for <body> (page background) */\n`;
        cssCode += `body {\n`;
        cssCode += `    background-color: ${hexToRgba(bbs.backgroundColor, bbs.bgAlpha)};\n`; // Use RGBA
        if (bbs.imageUrl) {
            cssCode += `    background-image: url('${bbs.imageUrl}');\n`;
        }
        cssCode += `    background-size: ${bbs.size};\n`;
        cssCode += `    background-repeat: ${bbs.repeat};\n`;
        cssCode += `    background-position: ${bbs.position};\n`;
        cssCode += `    opacity: ${bbs.opacity};\n`;
        if (bodyFilterString.trim() !== 'blur(0px) grayscale(0%) brightness(100%) contrast(100%) sepia(0%) hue-rotate(0deg) invert(0%) saturate(100%)') {
             cssCode += `    filter: ${bodyFilterString.trim()};\n`;
        } else {
             cssCode += `    filter: none; /* No filters applied */\n`;
        }
        if (bbs.animation !== 'none') {
            cssCode += `    animation: ${bbs.animation}-animation ${bbs.animationDuration}s linear infinite;\n`;
        }
        cssCode += `    transition: background-color 0.5s ease, background-image 0.5s ease, background-size 0.5s ease, background-position 0.5s ease, opacity 0.3s ease, filter 0.3s ease;\n`;
        cssCode += `}\n\n`;

        // Keyframes (generated once)
        cssCode += `@keyframes pan-animation {\n`;
        cssCode += `    0% { background-position: 0% 0%; }\n`;
        cssCode += `    50% { background-position: 100% 100%; }\n`;
        cssCode += `    100% { background-position: 0% 0%; }\n`;
        cssCode += `}\n\n`;

        cssCode += `@keyframes zoom-animation {\n`;
        cssCode += `    0% { background-size: cover; }\n`;
        cssCode += `    50% { background-size: 110%; }\n`;
        cssCode += `    100% { background-size: cover; }\n`;
        cssCode += `}\n\n`;

        for (const id in createdElements) {
            const elementProps = createdElements[id].props;
            
            if (!document.getElementById(id)) {
                delete createdElements[id];
                continue;
            }

            const currentWidth = elementProps.width.endsWith('px') ? `${parseInt(elementProps.width)}px` : elementProps.width;
            const currentHeight = elementProps.height.endsWith('px') ? `${parseInt(elementProps.height)}px` : elementProps.height;
            

            let contentHtml = elementProps.text;
            if (elementProps.imageUrl && elementProps.bgSize === 'auto') {
                contentHtml = `<img src="${elementProps.imageUrl}" alt="${elementProps.text || 'элемент'}">`;
            }

            const elementFilterString = `blur(${elementProps.filters.blur}px) ` +
                                        `grayscale(${elementProps.filters.grayscale}%) ` +
                                        `brightness(${elementProps.filters.brightness}%) ` +
                                        `contrast(${elementProps.filters.contrast}%) ` +
                                        `sepia(${elementProps.filters.sepia}%) ` +
                                        `hue-rotate(${elementProps.filters.hueRotate}deg) ` +
                                        `invert(${elementProps.filters.invert}%) ` +
                                        `saturate(${elementProps.filters.saturate}%)`;
            
            const textShadowString = `${elementProps.textShadow.offsetX}px ${elementProps.textShadow.offsetY}px ${elementProps.textShadow.blur}px ${elementProps.textShadow.color}`;
            const boxShadowString = `${elementProps.boxShadow.offsetX}px ${elementProps.boxShadow.offsetY}px ${elementProps.boxShadow.blur}px ${elementProps.boxShadow.spread}px ${elementProps.boxShadow.color}`;

            htmlCode += `<!-- HTML for element ID: ${id} -->\n`;
            htmlCode += `<div id="${id}" class="designer-element" style="\n`;
            htmlCode += `    left: ${elementProps.left}px;\n`;
            htmlCode += `    top: ${elementProps.top}px;\n`;
            htmlCode += `    z-index: ${elementProps.zIndex};\n`;
            htmlCode += `    background-color: ${hexToRgba(elementProps.bgColor, elementProps.bgAlpha)};\n`; // Use RGBA
            if (elementProps.imageUrl) {
                htmlCode += `    background-image: url('${elementProps.imageUrl}');\n`;
            }
            htmlCode += `    background-size: ${elementProps.bgSize};\n`;
            htmlCode += `    background-repeat: ${elementProps.bgRepeat};\n`;
            htmlCode += `    background-position: ${elementProps.bgPosition};\n`;
            htmlCode += `    opacity: ${elementProps.opacity};\n`;
            if (elementFilterString.trim() !== 'blur(0px) grayscale(0%) brightness(100%) contrast(100%) sepia(0%) hue-rotate(0deg) invert(0%) saturate(100%)') {
                htmlCode += `    filter: ${elementFilterString.trim()};\n`;
            } else {
                htmlCode += `    filter: none; /* No filters applied */\n`;
            }
            if (elementProps.animation !== 'none') {
                 htmlCode += `    animation: ${elementProps.animation}-animation ${elementProps.animationDuration}s linear infinite;\n`;
            }
            htmlCode += `    color: ${elementProps.textColor};\n`;
            htmlCode += `    border: ${elementProps.border};\n`;
            htmlCode += `    border-style: ${elementProps.borderStyle};\n`;
            htmlCode += `    border-radius: ${elementProps.borderRadius}px;\n`;
            htmlCode += `    font-size: ${elementProps.fontSize}px;\n`;
            htmlCode += `    font-family: '${elementProps.fontFamily}';\n`;
            htmlCode += `    font-weight: ${elementProps.fontWeight};\n`;
            htmlCode += `    letter-spacing: ${elementProps.letterSpacing}px;\n`;
            htmlCode += `    text-align: ${elementProps.textAlign};\n`;
            if (textShadowString.trim() !== '0px 0px 0px rgba(0,0,0,0)') {
                 htmlCode += `    text-shadow: ${textShadowString};\n`;
            } else {
                 htmlCode += `    text-shadow: none; /* No text shadow applied */\n`;
            }
            if (boxShadowString.trim() !== '0px 3px 10px 0px rgba(0,0,0,0.2)') { // Default box shadow
                htmlCode += `    box-shadow: ${boxShadowString};\n`;
            } else {
                htmlCode += `    box-shadow: none; /* No box shadow applied */\n`;
            }
            htmlCode += `    padding: ${elementProps.padding.top}${elementProps.padding.unit} ${elementProps.padding.right}${elementProps.padding.unit} ${elementProps.padding.bottom}${elementProps.padding.unit} ${elementProps.padding.left}${elementProps.padding.unit};\n`;
            htmlCode += `    margin: ${elementProps.margin.top}${elementProps.margin.unit} ${elementProps.margin.right}${elementProps.margin.unit} ${elementProps.margin.bottom}${elementProps.margin.unit} ${elementProps.margin.left}${elementProps.margin.unit};\n`;
            htmlCode += `    width: ${currentWidth};\n`;
            htmlCode += `    height: ${currentHeight};\n`;
            htmlCode += `">`;
            htmlCode += `${contentHtml}`;
            htmlCode += `</div>\n\n`;
        }
        
        const baseElementCss = `
/* Базовые стили для designer-element (слоев/блоков/кнопок) */
.designer-element {
    position: absolute;
    cursor: grab;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, transform 0.1s ease, background-image 0.2s ease, filter 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
    min-width: 50px;
    min-height: 35px;
    user-select: none;
    box-sizing: border-box;
}
.designer-element:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
.designer-element.dragging {
    cursor: grabbing;
    z-index: 9999 !important;
    transform: scale(1.01);
}
.designer-element.selected {
    outline: 2px dashed #3b82f6;
    outline-offset: 4px;
    box-shadow: 0 0 10px 5px rgba(59, 130, 246, 0.5); /* Добавляем легкое свечение при выборе */
}
.designer-element img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    pointer-events: none;
}
/* Ручка для изменения размера */
.resize-handle {
    position: absolute;
    width: 15px;
    height: 15px;
    background: #e2e8f0;
    border-radius: 50%;
    bottom: -7px;
    right: -7px;
    cursor: se-resize;
    z-index: 1001;
    border: 1px solid #64748b;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
            `;
        cssCode += baseElementCss;

        if (generatedCodeContent) {
            generatedCodeContent.textContent = `<!-- HTML-код динамических элементов -->\n${htmlCode}\n\n<!-- CSS-стили (добавьте в ваш <style> блок или отдельный файл .css) -->\n${cssCode}\n`;
        } else {
            console.error('Элемент для отображения сгенерированного кода не найден.');
        }
    }

    // --- Attach Event Listeners ---
    // Sidebar controls
    if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Element creation and code display
    if (createButtonBtn) createButtonBtn.addEventListener('click', createDraggableResizableElement);
    if (showCodeBtn) {
        showCodeBtn.addEventListener('click', () => {
            if (generatedCodeDisplay) {
                generatedCodeDisplay.style.display = generatedCodeDisplay.style.display === 'none' ? 'block' : 'none';
                updateGeneratedCode();
            }
        });
    }
    if (closeCodeDisplayBtn) {
        closeCodeDisplayBtn.addEventListener('click', () => {
            if (generatedCodeDisplay) {
                generatedCodeDisplay.style.display = 'none';
            }
        });
    }

    // Project Save/Load
    waitForFirebase().then(() => {
        if (saveProjectBtn) saveProjectBtn.addEventListener('click', saveProject);
        if (loadProjectBtn) loadProjectBtn.addEventListener('click', loadProject);
    }).catch(error => {
        console.error("Firebase not ready for save/load:", error);
    });

    // Element Settings Modal controls
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeElementSettings);
    if (cancelElementSettingsBtn) cancelElementSettingsBtn.addEventListener('click', closeElementSettings);
    if (saveElementSettingsBtn) saveElementSettingsBtn.addEventListener('click', saveElementSettings);
    if (deleteElementBtn) deleteElementBtn.addEventListener('click', deleteElement);

    if (elementSettingsModal) {
        elementSettingsModal.addEventListener('click', (e) => {
            if (e.target === elementSettingsModal) {
                closeElementSettings();
            }
        });
    }
    
    // Element properties listeners (within modal)
    // Basic text/number/color inputs
    if (elementText) elementText.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.text = e.target.value; applyElementSettings(activeEditingElementId); });
    // LLM-related
    if (generateTextBtn) generateTextBtn.addEventListener('click', generateTextForElement);

    if (elementZIndex) elementZIndex.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.zIndex = parseInt(e.target.value) || 1; applyElementSettings(activeEditingElementId); });
    
    // Element Background Color and Alpha
    if (elementBgColor) elementBgColor.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.bgColor = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementBgAlpha) elementBgAlpha.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.bgAlpha = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });

    if (elementImageUrl) elementImageUrl.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.imageUrl = e.target.value; applyElementSettings(activeEditingElementId); });
    if (applyElementBgImageBtn) applyElementBgImageBtn.addEventListener('click', () => { if(activeEditingElementId && elementImageUrl) { createdElements[activeEditingElementId].props.imageUrl = elementImageUrl.value; applyElementSettings(activeEditingElementId); } });
    if (elementImageUpload) elementImageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && activeEditingElementId) {
            const reader = new FileReader();
            reader.onload = (event) => {
                createdElements[activeEditingElementId].props.imageUrl = event.target.result;
                if (elementImageUrl) elementImageUrl.value = ''; // Clear URL input if local image is uploaded
                applyElementSettings(activeEditingElementId);
            };
            reader.readAsDataURL(file);
        }
    });
    if (elementBackgroundSize) elementBackgroundSize.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.bgSize = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementBackgroundRepeat) elementBackgroundRepeat.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.bgRepeat = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementBackgroundPosition) elementBackgroundPosition.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.bgPosition = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementOpacity) elementOpacity.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.opacity = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });

    // Element Filter event listeners
    if (elementFilterBlur) elementFilterBlur.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.filters.blur = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });
    if (elementFilterGrayscale) elementFilterGrayscale.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.filters.grayscale = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });
    if (elementFilterBrightness) elementFilterBrightness.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.filters.brightness = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });
    if (elementFilterContrast) elementFilterContrast.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.filters.contrast = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });
    if (elementFilterSepia) elementFilterSepia.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.filters.sepia = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });
    if (elementFilterHueRotate) elementFilterHueRotate.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.filters.hueRotate = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });
    if (elementFilterInvert) elementFilterInvert.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.filters.invert = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });
    if (elementFilterSaturate) elementFilterSaturate.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.filters.saturate = parseFloat(e.target.value); applyElementSettings(activeEditingElementId); });
    if (resetElementBgFiltersBtn) resetElementBgFiltersBtn.addEventListener('click', resetElementFilters);

    // Element Animation event listeners
    if (elementBackgroundAnimation) elementBackgroundAnimation.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.animation = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementAnimationDuration) elementAnimationDuration.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.animationDuration = parseFloat(e.target.value) || 10; applyElementSettings(activeEditingElementId); });

    // Text styles
    if (elementTextColor) elementTextColor.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.textColor = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementFontFamily) elementFontFamily.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.fontFamily = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementFontSize) elementFontSize.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.fontSize = parseInt(e.target.value) || 14; applyElementSettings(activeEditingElementId); });
    if (elementFontWeight) elementFontWeight.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.fontWeight = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementLetterSpacing) elementLetterSpacing.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.letterSpacing = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementTextAlign) elementTextAlign.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.textAlign = e.target.value; applyElementSettings(activeEditingElementId); });

    // Text Shadow
    if (elementTextShadowColor) elementTextShadowColor.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.textShadow.color = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementTextShadowBlur) elementTextShadowBlur.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.textShadow.blur = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementTextShadowOffsetX) elementTextShadowOffsetX.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.textShadow.offsetX = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementTextShadowOffsetY) elementTextShadowOffsetY.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.textShadow.offsetY = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (resetElementTextShadowBtn) resetElementTextShadowBtn.addEventListener('click', resetElementTextShadow);

    // Box Shadow
    if (elementBoxShadowColor) elementBoxShadowColor.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.boxShadow.color = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementBoxShadowOffsetX) elementBoxShadowOffsetX.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.boxShadow.offsetX = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementBoxShadowOffsetY) elementBoxShadowOffsetY.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.boxShadow.offsetY = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementBoxShadowBlur) elementBoxShadowBlur.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.boxShadow.blur = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementBoxShadowSpread) elementBoxShadowSpread.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.boxShadow.spread = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (resetElementBoxShadowBtn) resetElementBoxShadowBtn.addEventListener('click', resetElementBoxShadow);

    // Border and Size
    if (elementBorder) elementBorder.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.border = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementBorderStyle) elementBorderStyle.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.borderStyle = e.target.value; applyElementSettings(activeEditingElementId); });
    if (elementBorderRadius) elementBorderRadius.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.borderRadius = parseInt(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementWidth) elementWidth.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.width = e.target.value === '' ? 'auto' : `${parseInt(e.target.value)}px`; applyElementSettings(activeEditingElementId); });
    if (elementHeight) elementHeight.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.height = e.target.value === '' ? 'auto' : `${parseInt(e.target.value)}px`; applyElementSettings(activeEditingElementId); });
    if (stretchWidthBtn) stretchWidthBtn.addEventListener('click', () => {
        if(activeEditingElementId) {
            createdElements[activeEditingElementId].props.width = '100%';
            elementWidth.value = ''; // Clear px input if set to 100%
            applyElementSettings(activeEditingElementId);
        }
    });
    if (stretchHeightBtn) stretchHeightBtn.addEventListener('click', () => {
        if(activeEditingElementId) {
            createdElements[activeEditingElementId].props.height = '100%';
            elementHeight.value = ''; // Clear px input if set to 100%
            applyElementSettings(activeEditingElementId);
        }
    });

    // Padding
    if (elementPaddingTop) elementPaddingTop.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.padding.top = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementPaddingRight) elementPaddingRight.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.padding.right = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementPaddingBottom) elementPaddingBottom.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.padding.bottom = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementPaddingLeft) elementPaddingLeft.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.padding.left = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementPaddingUnit) elementPaddingUnit.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.padding.unit = e.target.value; applyElementSettings(activeEditingElementId); });
    if (resetElementPaddingBtn) resetElementPaddingBtn.addEventListener('click', resetElementPadding);

    // Margin
    if (elementMarginTop) elementMarginTop.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.margin.top = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementMarginRight) elementMarginRight.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.margin.right = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementMarginBottom) elementMarginBottom.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.margin.bottom = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementMarginLeft) elementMarginLeft.addEventListener('input', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.margin.left = parseFloat(e.target.value) || 0; applyElementSettings(activeEditingElementId); });
    if (elementMarginUnit) elementMarginUnit.addEventListener('change', (e) => { if(activeEditingElementId) createdElements[activeEditingElementId].props.margin.unit = e.target.value; applyElementSettings(activeEditingElementId); });
    if (resetElementMarginBtn) resetElementMarginBtn.addEventListener('click', resetElementMargin);


    // Body Background event listeners (global)
    if (bodyBgColorPicker) bodyBgColorPicker.addEventListener('input', (e) => { bodyBackgroundSettings.backgroundColor = e.target.value; applyBodyBackgroundStyles(); });
    if (bodyBgAlpha) bodyBgAlpha.addEventListener('input', (e) => { bodyBackgroundSettings.bgAlpha = parseFloat(e.target.value); applyBodyBackgroundStyles(); }); // New: Body background alpha
    if (applyBodyBgImageBtn) {
        applyBodyBgImageBtn.addEventListener('click', () => {
            if (bodyBgImageUrl) {
                bodyBackgroundSettings.imageUrl = bodyBgImageUrl.value.trim();
                applyBodyBackgroundStyles();
            }
        });
    }
    if (bodyBgImageUpload) bodyBgImageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                bodyBackgroundSettings.imageUrl = event.target.result;
                if (bodyBgImageUrl) bodyBgImageUrl.value = '';
                applyBodyBackgroundStyles();
            };
            reader.readAsDataURL(file);
        }
    });
    if (bodyBackgroundSize) bodyBackgroundSize.addEventListener('change', (e) => { bodyBackgroundSettings.size = e.target.value; applyBodyBackgroundStyles(); });
    if (bodyBackgroundRepeat) bodyBackgroundRepeat.addEventListener('change', (e) => { bodyBackgroundSettings.repeat = e.target.value; applyBodyBackgroundStyles(); });
    if (bodyBackgroundPosition) bodyBackgroundPosition.addEventListener('change', (e) => { bodyBackgroundSettings.position = e.target.value; applyBodyBackgroundStyles(); });
    if (bodyBackgroundOpacity) bodyBackgroundOpacity.addEventListener('input', (e) => { bodyBackgroundSettings.opacity = parseFloat(e.target.value); applyBodyBackgroundStyles(); });

    // Body Filter event listeners
    if (bodyFilterBlur) bodyFilterBlur.addEventListener('input', (e) => { bodyBackgroundSettings.filters.blur = parseFloat(e.target.value); applyBodyBackgroundStyles(); });
    if (bodyFilterGrayscale) bodyFilterGrayscale.addEventListener('input', (e) => { bodyBackgroundSettings.filters.grayscale = parseFloat(e.target.value); applyBodyBackgroundStyles(); });
    if (bodyFilterBrightness) bodyFilterBrightness.addEventListener('input', (e) => { bodyBackgroundSettings.filters.brightness = parseFloat(e.target.value); applyBodyBackgroundStyles(); });
    if (bodyFilterContrast) bodyFilterContrast.addEventListener('input', (e) => { bodyBackgroundSettings.filters.contrast = parseFloat(e.target.value); applyBodyBackgroundStyles(); });
    if (bodyFilterSepia) bodyFilterSepia.addEventListener('input', (e) => { bodyBackgroundSettings.filters.sepia = parseFloat(e.target.value); applyBodyBackgroundStyles(); });
    if (bodyFilterHueRotate) bodyFilterHueRotate.addEventListener('input', (e) => { bodyBackgroundSettings.filters.hueRotate = parseFloat(e.target.value); applyBodyBackgroundStyles(); });
    if (bodyFilterInvert) bodyFilterInvert.addEventListener('input', (e) => { bodyBackgroundSettings.filters.invert = parseFloat(e.target.value); applyBodyBackgroundStyles(); });
    if (bodyFilterSaturate) bodyFilterSaturate.addEventListener('input', (e) => { bodyBackgroundSettings.filters.saturate = parseFloat(e.target.value); applyBodyBackgroundStyles(); });

    // Body Animation event listeners
    if (bodyBackgroundAnimation) bodyBackgroundAnimation.addEventListener('change', (e) => { bodyBackgroundSettings.animation = e.target.value; applyBodyBackgroundStyles(); });
    if (bodyAnimationDuration) bodyAnimationDuration.addEventListener('input', (e) => { bodyBackgroundSettings.animationDuration = parseFloat(e.target.value) || 10; applyBodyBackgroundStyles(); });


    if (clearBodyBgBtn) clearBodyBgBtn.addEventListener('click', clearBodyBackground);
    if (resetBodyFiltersBtn) resetBodyFiltersBtn.addEventListener('click', resetBodyFilters);


    // Global click listener to deselect elements if clicked outside
    if (mainContent) {
        mainContent.addEventListener('click', (e) => {
            if (e.target === mainContent || e.target === emptyContentMessage) {
                document.querySelectorAll('.designer-element.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                activeEditingElementId = null;
            }
        });
    }


    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (sidebar && sidebar.classList.contains('open') && mainContent) {
                mainContent.classList.add('shifted');
            } else if (mainContent) {
                mainContent.classList.remove('shifted');
            }
        } else {
            if (mainContent) {
                mainContent.classList.remove('shifted');
            }
        }

        for (const id in createdElements) {
            const elementDOM = createdElements[id].element;
            const elementProps = createdElements[id].props;

            if (!elementDOM || !mainContent) continue;

            let newLeft = elementDOM.offsetLeft;
            let newTop = elementDOM.offsetTop;
            let newWidth = elementDOM.offsetWidth;
            let newHeight = elementDOM.offsetHeight;

            const mainContentRect = mainContent.getBoundingClientRect();

            // Only adjust position if element is not set to 100% width/height
            if (elementProps.width !== '100%') {
                newLeft = Math.max(0, Math.min(newLeft, mainContentRect.width - newWidth));
                elementDOM.style.left = `${newLeft}px`;
                elementProps.left = newLeft; // Update stored property
            } else {
                elementDOM.style.left = `0px`; // Snap to left if 100% width
                elementProps.left = 0;
            }

            if (elementProps.height !== '100%') {
                newTop = Math.max(0, Math.min(newTop, mainContentRect.height - newHeight));
                elementDOM.style.top = `${newTop}px`;
                elementProps.top = newTop; // Update stored property
            } else {
                elementDOM.style.top = `0px`; // Snap to top if 100% height
                elementProps.top = 0;
            }
            
            // Adjust size for 'auto' or 'Npx' if parent size changes
            if (elementProps.width !== '100%') { // Only adjust if not fixed 100%
                newWidth = Math.min(newWidth, mainContentRect.width - elementProps.left);
                if (elementProps.width.endsWith('px')) { // If it was a fixed px width, adjust
                    elementDOM.style.width = `${newWidth}px`;
                    elementProps.width = `${newWidth}px`;
                }
            }
            if (elementProps.height !== '100%') { // Only adjust if not fixed 100%
                newHeight = Math.min(newHeight, mainContentRect.height - elementProps.top);
                if (elementProps.height.endsWith('px')) { // If it was a fixed px height, adjust
                    elementDOM.style.height = `${newHeight}px`;
                    elementProps.height = `${newHeight}px`;
                }
            }
        }
        updateGeneratedCode();
    });

    // Initial setup
    applyBodyBackgroundStyles();
    updateGeneratedCode();
    updateEmptyMessageVisibility();
    applyInitialSettingsToInputs();
});
