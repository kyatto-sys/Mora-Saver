let currentSavings = 0;
let targetAmount = 0;
let currencySymbol = '$';
let savingGoal = '';

window.addEventListener('DOMContentLoaded', loadData);

function startSaving() {
    const goalInput = document.getElementById('savingGoal').value.trim();
    const currencySelect = document.getElementById('currency').value;
    const targetInput = document.getElementById('targetAmount').value;

    if (!goalInput) {
        alert('Please enter what you\'re saving for!');
        return;
    }

    savingGoal = goalInput;
    currencySymbol = currencySelect;
    targetAmount = parseFloat(targetInput) || 1000;

    document.getElementById('goalTitle').textContent = `Saving for: ${savingGoal}`;
    document.getElementById('goalInfo').textContent = targetAmount ?
        `Target: ${currencySymbol}${targetAmount}` : `Target: Not set`;

    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('jarContainer').style.display = 'block';

    const sound = document.getElementById('startSound');
    if (sound) sound.play();
    saveData();
    updateDisplay();

}

function addMoney() {
    const addAmountInput = document.getElementById('addAmount');
    const amount = parseFloat(addAmountInput.value);

    if (isNaN(amount) || amount <= 0) {
    const sound = document.getElementById('errorSound');
    if (sound) sound.play();
    setTimeout(() => {
        document.getElementById('customAlert').style.display = 'block';
    }, 100);
    return;
}
    currentSavings += amount;
    addAmountInput.value = '';

    addCoins(amount);

    const sound = document.getElementById('addMoneySound');
    if (sound) sound.play();

    updateDisplay();
    saveData();
}

function addCoins(amount) {
    const coinsContainer = document.getElementById('coinsContainer');
    const numCoins = Math.min(Math.floor(amount / 10) + 1, 15);

    for (let i = 0; i < numCoins; i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.className = 'coin';

            // mora mora mora
            coin.style.backgroundImage = 'url("images/mora.png")';
            coin.style.left = Math.random() * 140 + 10 + 'px';
            coin.style.bottom = Math.random() * 60 + 5 + 'px';
            coin.style.animationDelay = Math.random() * 3 + 's';
            coin.style.animationDuration = (3 + Math.random() * 2) + 's';
            coin.style.transform = `rotate(${Math.random() * 360}deg)`;

            const scale = 0.8 + Math.random() * 0.4;
            coin.style.width = (32 * scale) + 'px';
            coin.style.height = (32 * scale) + 'px';

            coinsContainer.appendChild(coin);
        }, i * 150);
    }
}

function updateDisplay() {
    document.getElementById('savedAmount').textContent =
        `${currencySymbol}${currentSavings.toFixed(2)}`;

    const progressPercentage = targetAmount > 0 ?
        Math.min((currentSavings / targetAmount) * 100, 100) : 0;
    document.getElementById('progressFill').style.width = progressPercentage + '%';

    document.getElementById('progressText').textContent = targetAmount > 0 ?
        `${progressPercentage.toFixed(1)}% of goal reached` :
        `Keep saving! You're doing great!`;

    const jarFillPercentage = targetAmount > 0 ?
        Math.min((currentSavings / targetAmount) * 100, 100) :
        Math.min((currentSavings / 1000) * 100, 100);
    document.getElementById('coinsContainer').style.height = jarFillPercentage + '%';

    if (targetAmount > 0 && currentSavings >= targetAmount) { 

    alert(`🎉 Congratulations! You've reached your savings goal for ${savingGoal}! Go get that bro!🎉`);
        const sound = document.getElementById('goalSound');
            if (sound) sound.play();
    }
}

// leset
function resetJar() {
    if (confirm('Are you sure you want to reset your savings jar? This will clear all your progress.')) {
        currentSavings = 0;
        targetAmount = 0;
        currencySymbol = '$';
        savingGoal = '';
        localStorage.removeItem('moraSaverData');

        document.getElementById('coinsContainer').innerHTML = '';
        document.getElementById('coinsContainer').style.height = '0%';

        document.getElementById('jarContainer').style.display = 'none';
        document.getElementById('setupForm').style.display = 'block';
        document.getElementById('savingGoal').value = '';
        document.getElementById('targetAmount').value = '';
        document.getElementById('currency').value = '$';

        updateDisplay();
    }
}

// Local Storage Sorcery
function saveData() {
    const data = {
        currentSavings,
        targetAmount,
        currencySymbol,
        savingGoal
    };
    localStorage.setItem('moraSaverData', JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem('moraSaverData');
    if (saved) {
        const data = JSON.parse(saved);
        currentSavings = data.currentSavings || 0;
        targetAmount = data.targetAmount || 0;
        currencySymbol = data.currencySymbol || '$';
        savingGoal = data.savingGoal || '';

        document.getElementById('goalTitle').textContent = `Saving for: ${savingGoal}`;
        document.getElementById('goalInfo').textContent = targetAmount ?
            `Target: ${currencySymbol}${targetAmount}` : `Target: Not set`;

        document.getElementById('setupForm').style.display = 'none';
        document.getElementById('jarContainer').style.display = 'block';

        updateDisplay();
    }
}

document.getElementById('addAmount').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addMoney();
    }
});

document.getElementById('savingGoal').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        startSaving();
    }
});
