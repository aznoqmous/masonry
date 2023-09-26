export default class Masonry extends EventTarget {
    constructor(container, opts={}){
        super()

        this.opts = Object.assign({
            columnCount: 2,
            gap: 0
        }, opts)
        this.container = container

        this.children = [...this.container.children]
        this.columns = []

        this.bind()
        this.build()
    }

    get columnCount(){
        return window.getComputedStyle(this.container)['column-count'] || this.opts.columnCount
    }

    get gap(){
        return window.getComputedStyle(this.container)['gap'] || this.opts.gap
    }

    build(){
        this.disconnect()
        const columnCount = this.columnCount
        this.container.style.display = "grid"
        this.container.style.alignItems = "baseline"
        this.container.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`
        this.container.innerHTML = ""
        this.columns = []
        for(let i = 0; i < columnCount; i++){
            const column = document.createElement('div')
            this.container.appendChild(column)
            this.columns.push(column)
            column.style.display = "flex"
            column.style.flexDirection = "column"
            column.style.gap = this.gap
        }
        this.children.map(child => this.append(child))
        this.connect()
    }

    append(element){
        if(!this.children.includes(element)) this.children.push(element)
        this.smallestColumn.append(element)
    }

    get smallestColumn(){
        this.columns.map(a => a._height = a.getBoundingClientRect().height)
        return this.columns.sort((a,b)=> a._height - b._height)[0]
    }

    bind(){
        window.addEventListener('resize', ()=>{
            if(!this.lastColumns || this.lastColumns != this.columnCount) this.build()
            this.lastColumns = this.columnCount
        })
        this.observer = new MutationObserver((entries)=>{
            for(let entry of entries){
                entry.addedNodes.forEach(element => this.append(element))
            }
        })
        this.connect()
    }

    connect(){
        this.observer.observe(this.container, {childList: true})
    }
    disconnect(){
        this.observer.disconnect(this.container)
    }

    static bind(){
        document.querySelectorAll('.masonry').forEach(element => new this(element))
    }
}