function submit() {
    playerAtk = parseInt(document.querySelector('#playeratk').value)
    playerDf = parseInt(document.querySelector('#playerdf').value)
    playerMaxHP = parseInt(document.querySelector('#playermaxhp').value)

    framesOff = parseInt(document.querySelector('#accuracy').value)
    accuracy = framesOff === -1 ? 0 : framesOff === 0 ? 150 : framesOff === 1 ? 120 : framesOff == 2 ? 110 : 100 - (framesOff * 2)

    enemyAtk = parseInt(document.querySelector('#enemyatk').value)
    enemyDf = parseInt(document.querySelector('#enemydf').value)
    enemyMaxHP = parseInt(document.querySelector('#enemymaxhp').value)

    fightChecked = document.querySelector('#fight').checked
    bulletHitChecked = document.querySelector('#bullet-hit').checked

    let answer;

    if (fightChecked) {
        console.log(`player attack: ${playerAtk}, enemy defence: ${enemyDf}, accuracy: ${accuracy}`)
        console.log(`calculation: (${playerAtk} * ${accuracy}) / 20 - 3 * ${enemyDf}`)
        answer = getPlayerDamage(playerAtk, accuracy, enemyDf)
    }

    if (bulletHitChecked) {
        console.log(`player defence: ${playerDf}, player max hp: ${playerMaxHP}, enemy attack: ${enemyAtk}`)
        answer = getBulletDamage(playerDf, playerMaxHP, enemyAtk)
    }
    console.log(answer)
    answerP.innerHTML = answer
}

function getPlayerDamage(atk, accuracy, df) {
    return (atk * accuracy) / 20 - 3 * df
}

function getBulletDamage(df, maxHp, atk) {
    dmg = 5 * atk
    console.log(`original damage: ${dmg}`)
    for (let i = 0; i < df; i++) {
        let reduction = dmg >= Math.round(maxHp / 5) ? 3 : dmg >= Math.round(maxHp / 8) ? 2 : 1
        dmg -= reduction
        console.log(`reduced by ${reduction} (now ${dmg})`)
    }
    return dmg
}

const answerP = document.querySelector('#answer')

